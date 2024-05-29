import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import Paragraph from 'editorjs-paragraph-with-alignment';
import NestedList from '@editorjs/nested-list';
// import AttachesTool from '@editorjs/attaches';

const AnyButton = require('editorjs-button');

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: NestedList,
  code: Code,
  linkTool: LinkTool,
  image: Image,
  raw: Raw,
  paragraph: Paragraph,
  header: {
    class: Header,
    config: {
      placeholder: 'Enter a header',
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 3,
    },
  },
  AnyButton: {
    class: AnyButton,
    inlineToolbar: true,
    config: {
      css: {
        btnColor: 'btn--gray',
      },
    },
  },
//   attaches: {
//     class: AttachesTool,
//     config: {
//       //   endpoint: 'http://localhost:8008/uploadFile'
//     },
//   },
  quote: Quote,
  checklist: CheckList,
  inlineCode: InlineCode,
  image: SimpleImage,
};
