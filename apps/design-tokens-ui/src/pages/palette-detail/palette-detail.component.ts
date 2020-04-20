/**
 * @license
 * Copyright 2020 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  FluidPaletteSourceAlias,
  FluidPaletteSourceShade,
} from '@dynatrace/shared/barista-definitions';

import { PaletteSourceService } from '../../services/palette';
import { generatePaletteContrastColors } from '../../utils/colors';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'tk-palette-detail',
  templateUrl: './palette-detail.component.html',
  styleUrls: ['./palette-detail.component.scss'],
})
export class PaletteDetailComponent implements OnDestroy {
  /** @internal maximum contrast ratio supported by Leonardo */
  readonly _maxRatio = 21;

  /** @internal palette that is currently edited */
  _palette: FluidPaletteSourceAlias;

  /** @internal cached to avoid recalculating on change detection cycles */
  _contrastColors: string[];

  /** Identifier of the current palette */
  private _paletteName: string;

  /** @internal the user must click the delete button twice to confirm */
  _showDeletePaletteConfirmation = false;

  private _destroy$ = new Subject<void>();

  constructor(
    private _paletteSourceService: PaletteSourceService,
    private _location: Location,
    route: ActivatedRoute,
  ) {
    route.params.pipe(takeUntil(this._destroy$)).subscribe(params => {
      this._paletteName = params.palette;
      this._palette = _paletteSourceService.getPaletteAlias(this._paletteName)!;
      this._calculateContrastColors();
    });
  }

  ngOnDestroy(): void {
    // Save edited palette on destroy using the original name
    this._paletteSourceService.setPaletteAlias(
      this._paletteName,
      this._palette,
    );

    this._destroy$.next();
    this._destroy$.complete();
  }

  /** The main color the palette is based on */
  get keyColor(): string {
    if (!this._palette) {
      return 'white';
    }
    return this._paletteSourceService.getKeyColor(this._palette);
  }

  set keyColor(color: string) {
    this._palette.keyColor = color;
  }

  /** @internal Recalculate the contrast colors */
  _calculateContrastColors(): void {
    this._contrastColors = generatePaletteContrastColors(this._palette);
  }

  /** @internal Sort shades by ratio */
  _sortShades(): void {
    this._palette.shades.sort((a, b) => a.ratio - b.ratio);
    this._calculateContrastColors();
  }

  /** @internal */
  _addShade(): void {
    const highestRatio = Math.max(
      ...this._palette.shades.map(shade => shade.ratio),
    );
    this._palette.shades.push({
      name: 'new shade',
      ratio: Math.min(highestRatio + 1, this._maxRatio),
      aliasName: `color-${this._palette.name}--new`,
      comment: '',
    });
    this._calculateContrastColors();
  }

  /** @internal */
  _deleteShade(shade: FluidPaletteSourceShade): void {
    this._palette.shades.splice(this._palette.shades.indexOf(shade), 1);
    this._calculateContrastColors();
  }

  /** @internal */
  _deletePalette(): void {
    if (!this._showDeletePaletteConfirmation) {
      // Confirm deletion
      this._showDeletePaletteConfirmation = true;
      return;
    }

    // The button was clicked a second time, so we can delete now
    this._paletteSourceService.deletePaletteAlias(this._palette.name);
    this._location.back();
  }

  /** @internal */
  _resetDeletePaletteConfirmation(): void {
    this._showDeletePaletteConfirmation = false;
  }

  /** @internal Adobe Leonardo URL for the current color palette */
  get leonardoUrl(): string {
    return this._paletteSourceService.getLeonardoUrl(this._palette);
  }
}
