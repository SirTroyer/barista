# Expandable section

The expandable section component provides basic expand/collapse functionality
based on the [expandable panel](/components/expandable-panel) but contains a
header (`<dt-expandable-section-header>`), which is the trigger of the
expandable panel.

<docs-source-example example="ExpandableSectionDefaultExample"></docs-source-example>

## Imports

You have to import the `DtExpandableSectionModule` when you want to use the
`dt-expandable-section`. The `dt-expandable-section` component also requires
Angular's `BrowserAnimationsModule` for animations. For more details on this see
[_Step 2: Animations_](/components/get-started/#step-2-animations) in the
getting started guide.

```typescript
@NgModule({
  imports: [DtExpandableSectionModule, BrowserAnimationsModule],
})
class MyModule {}
```

## Initialization

To apply the expandable panel, use the `<dt-expandable-section>` element.

| Attribute                      | Description                                              |
| ------------------------------ | -------------------------------------------------------- |
| `dt-expandable-section`        | The expandable section.                                  |
| `dt-expandable-section-header` | The component, which contains the content of the header. |

## Inputs

| Name       | Type      | Default | Description                                |
| ---------- | --------- | ------- | ------------------------------------------ |
| `expanded` | `boolean` | `false` | Sets or gets the section's expanded state. |
| `disabled` | `boolean` | `false` | Sets or gets the section's disabled state. |

In most cases the expandable section is closed by default, but it can also be
set to `expanded`.

<docs-source-example example="ExpandableSectionOpenExample"></docs-source-example>

## Outputs

| Name           | Type                   | Description                                     |
| -------------- | ---------------------- | ----------------------------------------------- |
| `expandChange` | `Observable<boolean>`  | Emits an event when the expanded state changes. |
| `expanded`     |  `Observable<boolean>` |  Event emitted when the panel is expanded.      |
| `collapsed`    |  `Observable<boolean>` |  Event emitted when the panel is collapsed.     |

## Methods

| Name     | Type      | Description                                                                          |
| -------- | --------- | ------------------------------------------------------------------------------------ |
| `toggle` | `boolean` | Toggles the expanded state, i.e. changes it to expanded if collapsed, or vice-versa. |
| `open`   | `void`    | Expands the panel.                                                                   |
| `close`  | `void`    | Collapses the panel.                                                                 |

See all methods in action in the following example.

<docs-source-example example="ExpandableSectionInteractiveExample"></docs-source-example>

## States

The expandable section's trigger has a default, hover, active, focus and
disabled state. The following example shows a disabled expandable section.

<docs-source-example example="ExpandableSectionDisabledExample"></docs-source-example>

## Theming

The expandable section can be placed on a dark background.

<docs-source-example example="ExpandableSectionDarkExample" themedark="true"></docs-source-example>

## Expandable section in use

Currently, the expandable section is used in combination with several
components, e.g. [Tags]({{link_to_id id='tag' }}).