import { ElementAst } from '@angular/compiler';
import { BasicTemplateAstVisitor, NgWalker } from 'codelyzer';
import { IRuleMetadata, RuleFailure, Rules } from 'tslint';
import { SourceFile } from 'typescript';
import { hasContentApartFrom } from '../helpers';

// tslint:disable-next-line:max-classes-per-file
class DtTagVisitor extends BasicTemplateAstVisitor {

  // tslint:disable-next-line no-any
  visitElement(element: ElementAst, context: any): any {
    this._validateElement(element);
    super.visitElement(element, context);
  }

  // tslint:disable-next-line no-any
  private _validateElement(element: ElementAst): any {
    if (element.name !== 'dt-tag') {
      return;
    }

    const tagChildren = [
      'dt-tag-key',
    ];

    if (hasContentApartFrom(element, tagChildren)) {
      return;
    }

    const startOffset = element.sourceSpan.start.offset;
    const endOffset = element.sourceSpan.end.offset;
    this.addFailureFromStartToEnd(startOffset, endOffset, 'A dt-tag must always contain text. Make sure this is the case even if you use nested components to render text.');
  }
}

/**
 * The dtTagNoEmptyRule ensures that a tag always has content.
 *
 * The following examples pass the lint checks:
 * <dt-tag>Tag content</dt-tag>
 * <dt-tag><dt-tag-key>[My key]:</dt-tag-key>My value</dt-tag>
 *
 * For the following examples the linter throws errors:
 * <dt-tag> </dt-tag>
 * <dt-tag><dt-tag-key>[My key]:</dt-tag-key></dt-tag>
 */
export class Rule extends Rules.AbstractRule {

  static readonly metadata: IRuleMetadata = {
    description: 'Ensures that a tag is never empty.',
    // tslint:disable-next-line no-null-keyword
    options: null,
    optionsDescription: 'Not configurable.',
    rationale: 'A tag must always contain text or another component that renders text.',
    ruleName: 'dt-tag-no-empty',
    type: 'maintainability',
    typescriptOnly: true,
  };

  apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: DtTagVisitor,
      }),
    );
  }
}