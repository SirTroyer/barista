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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FluidPaletteSourceAlias } from '@dynatrace/shared/barista-definitions';
import { PaletteSourceService } from '../../services/palette';

@Component({
  selector: 'tk-palettes',
  templateUrl: './palettes.component.html',
  styleUrls: ['./palettes.component.scss'],
})
export class PalettesComponent {
  paletteAliases: FluidPaletteSourceAlias[];

  constructor(
    private _router: Router,
    private _paletteSourceService: PaletteSourceService,
  ) {
    this.paletteAliases = _paletteSourceService.getAllPaletteAliases();
  }

  /** @internal Export palette as YAML */
  _yamlExport(): void {
    this._paletteSourceService.exportYaml();
  }

  /** @internal */
  _addPalette(): void {
    const palette: FluidPaletteSourceAlias = {
      name: 'new palette',
      keyColor: '#74dee6',
      baseColor: '#ffffff',
      colorspace: 'CAM02',
      type: 'adobe-leonardo',
      shades: [
        {
          name: 'light',
          ratio: 3,
          aliasName: 'color-new--light',
          comment: 'Light new color shade',
        },
        {
          name: 'base',
          ratio: 4.5,
          aliasName: 'color-new--base',
          comment: 'Base new color shade',
        },
      ],
    };

    this._paletteSourceService.addPaletteAlias(palette);
    this._router.navigate([`/palette/${palette.name}`]);
  }
}
