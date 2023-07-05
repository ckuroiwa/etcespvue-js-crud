<template>
    <div id="app">
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" ></ckeditor>
        <button v-on:click="emptyEditor()">Limpar editor</button>
    </div>
  </template>
  
  <script>
    import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
    import { Essentials } from '@ckeditor/ckeditor5-essentials';
    import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
    import { Alignment } from '@ckeditor/ckeditor5-alignment';
    import { Font } from '@ckeditor/ckeditor5-font';
    import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor/ckeditor5-basic-styles';
    import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
    import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
    import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
    import { Heading } from '@ckeditor/ckeditor5-heading';
    import { Highlight } from '@ckeditor/ckeditor5-highlight';
    import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
    import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
    import { AutoImage,
      Image,
      ImageCaption,
      ImageInsert,
      ImageResize,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      PictureEditing
  } from '@ckeditor/ckeditor5-image';
    import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
    import { AutoLink, Link, LinkImage } from '@ckeditor/ckeditor5-link';
    import { DocumentList, DocumentListProperties } from '@ckeditor/ckeditor5-list';
    import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
    import { Mention } from '@ckeditor/ckeditor5-mention';
    import { PageBreak } from '@ckeditor/ckeditor5-page-break';
    import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
    import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
    import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
    import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
    import { SpecialCharacters, SpecialCharactersEssentials } from '@ckeditor/ckeditor5-special-characters';
    import { Table, TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar } from '@ckeditor/ckeditor5-table';
    import { TextTransformation } from '@ckeditor/ckeditor5-typing';
    import { WordCount } from '@ckeditor/ckeditor5-word-count';
  
    export default {
        name: 'app',
        
        data() {
            return {
                editor: ClassicEditor,
                editorData: '<p>Conteúdo.</p>',
                editorConfig: { 
                  plugins: [
                  Autoformat, BlockQuote, Bold, Heading, Image, ImageCaption, 
                  ImageStyle, ImageToolbar, Indent, Italic, Link, DocumentList, MediaEmbed,
                  Paragraph, Table, TableToolbar, Alignment, AutoImage, AutoLink,
                  Code, CodeBlock, Essentials, FindAndReplace, Font, Highlight, HorizontalLine,
                  HtmlEmbed, ImageInsert, ImageResize, ImageUpload, IndentBlock,
                  LinkImage, DocumentListProperties, Mention, PageBreak, PasteFromOffice,
                  PictureEditing, RemoveFormat, SourceEditing, SpecialCharacters,
                  SpecialCharactersEssentials, Strikethrough, Subscript, Superscript,
                  TableCaption, TableCellProperties, TableColumnResize,
                  TableProperties, TextTransformation,
                  Underline, WordCount
                  ],
  
                  toolbar: {
                       items: [
                      'undo', 'redo',
                      '|',
                      'exportPdf', 'exportWord',
                      '|',
                       'formatPainter', 'findAndReplace', 'selectAll', 'wproofreader',
                      '|',
                      'heading',
                      '|',
                      'style',
                      '|',
                      'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
                      '-',
                      'bold', 'italic', 'underline',
                      {
                          label: 'Formatting',
                          icon: 'text',
                          items: [ 'strikethrough', 'subscript', 'superscript', 'code', '|', 'removeFormat' ]
                      },
                      '|',
                      'specialCharacters', 'horizontalLine', 'pageBreak',
                      '|',
                      'link', 'insertImage', 'insertTable', 'tableOfContents',
                      {
                          label: 'Insert',
                          icon: 'plus',
                          items: [ 'highlight', 'blockQuote', 'mediaEmbed', 'codeBlock', 'htmlEmbed' ]
                      },
                      '|',
                      'alignment',
                      '|',
                      'bulletedList',	'numberedList',	'outdent', 'indent',
                      //'|',
                      //'sourceEditing'
                      ],
                      shouldNotGroupWhenFull: true
                  },
              
                  style: {
                      definitions: [
                          {
                              name: 'Article category',
                              element: 'h3',
                              classes: [ 'category' ]
                          },
                          {
                              name: 'Title',
                              element: 'h2',
                              classes: [ 'document-title' ]
                          },
                          {
                              name: 'Subtitle',
                              element: 'h3',
                              classes: [ 'document-subtitle' ]
                          },
                          {
                              name: 'Info box',
                              element: 'p',
                              classes: [ 'info-box' ]
                          },
                          {
                              name: 'Side quote',
                              element: 'blockquote',
                              classes: [ 'side-quote' ]
                          },
                          {
                              name: 'Marker',
                              element: 'span',
                              classes: [ 'marker' ]
                          },
                          {
                              name: 'Spoiler',
                              element: 'span',
                              classes: [ 'spoiler' ]
                          },
                          {
                              name: 'Code (dark)',
                              element: 'pre',
                              classes: [ 'fancy-code', 'fancy-code-dark' ]
                          },
                          {
                              name: 'Code (bright)',
                              element: 'pre',
                              classes: [ 'fancy-code', 'fancy-code-bright' ]
                          }
                      ]
                  },
                  fontFamily: {
                      supportAllValues: true
                  },
                  fontSize: {
                      options: [ 10, 12, 14, 'default', 18, 20, 22 ],
                      supportAllValues: true
                  },
                  htmlEmbed: {
                      showPreviews: true
                  },
                  image: {
                      styles: [
                          'alignCenter',
                          'alignLeft',
                          'alignRight'
                      ],
                      resizeOptions: [
                          {
                              name: 'resizeImage:original',
                              label: 'Original',
                              value: null
                          },
                          {
                              name: 'resizeImage:50',
                              label: '50%',
                              value: '50'
                          },
                          {
                              name: 'resizeImage:75',
                              label: '75%',
                              value: '75'
                          }
                      ],
                      toolbar: [
                          'imageTextAlternative', 'toggleImageCaption', '|',
                          'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', 'imageStyle:side', '|',
                          'resizeImage'
                      ],
                      insert: {
                          integrations: [
                              'insertImageViaUrl'
                          ]
                      }
                  }
               } 
            }
          },
        
          methods: {
                emptyEditor() {
                    this.editorData = '';
                }
          }
    }
  </script>