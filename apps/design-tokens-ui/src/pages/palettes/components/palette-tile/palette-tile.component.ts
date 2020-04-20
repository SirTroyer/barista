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

import { Component, Input, OnInit } from '@angular/core';
import { FluidPaletteSourceAlias } from '@dynatrace/shared/barista-definitions';
import {
  getTextColorOnBackground,
  getDarkerColor,
  generatePaletteContrastColors,
} from '../../../../utils/colors';
import { PaletteSourceService } from '../../../../services/palette';

@Component({
  selector: 'tk-palette-tile',
  templateUrl: './palette-tile.component.html',
  styleUrls: ['./palette-tile.component.scss'],
})
export class PaletteTileComponent implements OnInit {
  /** Palette that should be displayed */
  @Input() paletteSource: FluidPaletteSourceAlias;

  /** @internal */
  _contrastColors: string[];

  /** @internal */
  _textColor: string;

  /** @internal */
  _overlayConfig = {};

  constructor(private _paletteSourceService: PaletteSourceService) {}

  ngOnInit(): void {
    this._textColor = getTextColorOnBackground(this.keyColor);
    this._contrastColors = generatePaletteContrastColors(this.paletteSource);
  }

  /** The main color the palette is based on */
  get keyColor(): string {
    return this._paletteSourceService.getKeyColor(this.paletteSource);
  }

  /** Darker version of the main color for the border */
  get borderColor(): string {
    return getDarkerColor(this.keyColor);
  }
}
