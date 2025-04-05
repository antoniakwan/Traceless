import { Component, type JSX } from "react";

type Editor = {
    kind: "PDF"
    Title? : string,
    Author?: string,
    Subject?: string,
    Keywords?: string[],
    Producer?: string,
    Creator?: string,
    CreateDate?: Date,
    ModificationDate?: Date,
} | {
    kind: "Image"
};

type EditorProps = {
    Type: Editor
  };
  
  
  type EditorState = {
    /** The root square of all squares in the design */
    Title? : string,
    Author?: string,
    Subject?: string,
    Keywords?: string[],
    Producer?: string,
    Creator?: string,
    CreateDate?: Date,
    ModificationDate?: Date,
  };
  
  
  /** UI for editing square design page. */
  export class TypeEditor extends Component<EditorProps, EditorState> {
  
    constructor(props: EditorProps) {
      super(props);
  
    }
  
    render = (): JSX.Element => {
        console.log("WERE HERE IN THE EDITOR");
        if(this.props.Type.kind === "PDF"){
            return <div>
                <button>Quick Wipe for PDF</button>
                <button> Sophisiti</button>
            </div>
        }else{
            return <div>
                <button> quick Wipe for Images</button>
            </div>
        }
    };
}