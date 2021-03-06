# WYSIWYG

WYSIWYG is a simple wrapper for a wysiwyg/rich-text style component
it was designed to be used by a Form component that also manages the 'Editing' state


## Props
| Name           | Type                   | Default                      | Required | Description                                                                                                                                                                    |
| -------------- | ---------------------- | ---------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| content        | string                 | ''                           | false    | String which is set to the initial state of `state.content`.<br>`state.content` is bound to component `<Editor />`'s prop `content`                                            |
| placeholder    | string                 | ''                           | false    | Acts a placeholder for `<Editor />``. value gets passed into<br>placeholder prop of `Editor`                                                                                   |
| onChange       | Function               |                              | true     | Callback function that triggers when `editorOnChange` is run.<br>The first parameter of this function has `content` of editor                                                  |
| onEditorFocus  | Function               | () => {}                     | false    | Callback function that triggers when Editor is focused                                                                                                                         |
| inputClass     | string                 | ''                           | false    | String css class for `input element` of `Editor` component                                                                                                                     |
| isEditing      | boolean                | false                        | false    | Boolean, if true the,markdown can be created or deleted in`Editor`                                                                                                             |
| paragraphClass | string                 | 'text--dk--flushed--wysiwyg' | false    | String css class that is applied to `<p>` with `dangerouslySetInnerHTML`                                                                                                       |
| editorId       | string                 | 'editor'                     | false    | identifier for editor input                                                                                                                                                    |
| editorClass    | Function &#124; Object |                              | true     | Input component that should accept the following props and perform logic<br>accordingly:<br>```<br> content,<br>onChange,<br>onEditorFocus,<br>editorId,<br>inputClass,<br>``` |
| htmlSanitiser  | Function               | null                         | false    | Function to sanitise `dangerouslySetInnerHTML`                                                                                                                                 |
