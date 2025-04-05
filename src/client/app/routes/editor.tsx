import { Component, type JSX } from "react";

const goSomewhere = () => {
  const a = document.createElement('a');
  a.href = "./editor";
  a.click();
}


import { useLocation, useNavigate } from 'react-router';
import {ToggleSwitch} from 'app/ToggleSwitch';
import {Styles} from 'app/Style'
type Editor = {
  kind: "PDF"
  Title?: string,
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


// type EditorState = {
//   /** The root square of all squares in the design */
//   Title?: string,
//   Author?: string,
//   Subject?: string,
//   Keywords?: string[],
//   Producer?: string,
//   Creator?: string,
//   CreateDate?: Date,
//   ModificationDate?: Date,
// };


// /** UI for editing square design page. */
// export default class TypeEditor extends Component<[], EditorState> {

//   constructor(
//     // props: EditorProps = {Type : {kind : "PDF"}}
//   ) {
//     super([])
//     // super(props);
//   }

//   render = (): JSX.Element => {
//     console.log("WERE HERE IN THE EDITOR");
//     return <div>
//       <button>Quick Wipe for PDF</button>
//       <button> Sophisiti</button>
//     </div>
//     // if (this.props.Type.kind === "PDF") {
//     //   return <div>
//     //     <button>Quick Wipe for PDF</button>
//     //     <button> Sophisiti</button>
//     //   </div>
//     // } else {
//     //   return <div>
//     //     <button> quick Wipe for Images</button>
//     //   </div>
//     // }
//   };
//     Type: Editor
//   };
  

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

export default function EditorWrapper() {
    const location = useLocation();
    const navigate = useNavigate();
    const editorType = location.state?.type || "PDF"; // Default to PDF if not specified
    
    return <TypeEditor Type={{kind: editorType}} />;
  }
  
  
/** UI for editing square design page. */
export class TypeEditor extends Component<EditorProps, EditorState> {

constructor(props: EditorProps) {
    super(props);

}

render = (): JSX.Element => {
    if(this.props.Type.kind === "PDF"){
        return <div style={Styles.container}>
            <div style={Styles.card}>
                Wipes all Data <button style={Styles.button}>Quick Wipe</button>
                Hard stuff <ToggleSwitch round={true} /> 
            </div>
        </div>
    }else{
        return <div style={Styles.container}>
            <div style={Styles.card}>
                <button style={Styles.button}> Quick Wipe</button>
                </div>
        </div>
    }
};
}


