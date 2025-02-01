import { FIRST_VERSION, LAST_VERSION, VERSIONS_AMOUNT } from '../configuration/constants'
import { ErrorCorrection, Mask, Version } from '../configuration/types'
import { FORMATTING_TEMPLATE_DRAWER } from '../graphics/drawers/templates/formatting-template-drawer'
import { DARK_MODULE_PATTERN_DRAWER } from '../graphics/drawers/patterns/dark-module-pattern-drawer'
import { ALIGNMENT_PATTERN_DRAWER } from '../graphics/drawers/patterns/alignment-pattern-drawer'
import { VERSION_TEMPLATE_DRAWER } from '../graphics/drawers/templates/version-template-drawer'
import { FORMATTING_INFORMATION } from '../configuration/formatting-information'
import { TIMING_PATTERN_DRAWER } from '../graphics/drawers/patterns/timing-pattern-drawer'
import { FINGER_PATTERN_DRAWER } from '../graphics/drawers/patterns/finger-pattern-drawer'
import { PatternDrawer } from '../graphics/drawers/patterns/pattern-drawer.interface'
import { VERSION } from '../configuration/version'
import { Figure } from '../graphics/types/figure.interface'
import { Range } from '@oleksii-pavlov/ranges'

export interface Setup<Drawer> {
  versions: Range[]
  drawer: Drawer
} 

export type PatternDrawerSetup = Setup<PatternDrawer>

export class GraphicsSetup {
  private readonly patternDrawerSetups: PatternDrawerSetup[] = []
  private readonly allVersionsRange = new Range({ min: FIRST_VERSION, max: LAST_VERSION })

  private readonly VERSION_TEMPLATE_VERSIONS_RANGE = new Range({ min: 7, max: LAST_VERSION })
  private readonly FORMATTING_TEMPLATE_VERSIONS_RANGE = this.allVersionsRange

  constructor() {
    this.patternDrawerSetups = [
      {
        drawer: TIMING_PATTERN_DRAWER,
        versions: [this.allVersionsRange]
      },
      {
        drawer: FINGER_PATTERN_DRAWER,
        versions: [this.allVersionsRange]
      },
      {
        drawer: ALIGNMENT_PATTERN_DRAWER,
        versions: [new Range({ min: 2, max: VERSIONS_AMOUNT })]
      },
      {
        drawer: DARK_MODULE_PATTERN_DRAWER,
        versions: [this.allVersionsRange]
      }
    ]
  }

  setupPatterns(version: Version): Figure[] {
    const drawersFigures = this.patternDrawerSetups.map<Figure[]>(setup => {
      const matchesVersion = setup.versions.some(range => range.containsValue(version))
      if (!matchesVersion) return []

      const figures = setup.drawer.draw(version)
      return figures
    })

    const totalFiguresList = drawersFigures.flat()

    return totalFiguresList
  }

  addVersion(version: Version): Figure[] {
    if (!this.VERSION_TEMPLATE_VERSIONS_RANGE.containsValue(version)) return []

    const versionBinary = VERSION.getEncodedVersionContent(version)
    const versionFigures = VERSION_TEMPLATE_DRAWER.draw(version, versionBinary)

    return versionFigures
  }

  addFormattingInfo(version: Version, errorCorrection: ErrorCorrection, mask: Mask) {
    if (!this.FORMATTING_TEMPLATE_VERSIONS_RANGE.containsValue(version)) return []

    const formattingBinary = FORMATTING_INFORMATION.getEncodedFormattingContent(errorCorrection, mask)
    const formattingFigures = FORMATTING_TEMPLATE_DRAWER.draw(version, formattingBinary)

    return formattingFigures
  }
}

export const GRAPHICS_SETUP = new GraphicsSetup()
