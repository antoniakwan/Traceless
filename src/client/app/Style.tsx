export namespace Styles {
    // Your existing styles
    export const container: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      margin: 0,
    }
  
    export const card: React.CSSProperties = {
      textAlign: 'center',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '300px',
      color: 'black',
    }
  
    export const input: React.CSSProperties = {
      marginBottom: '20px',
      padding: '10px',
      width: '100%',
      borderRadius: '4px',
      border: '1px solid #ccc',
      color: 'black',
      display: '',
    }
  
    export const buttons: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-around',
    }
  
    export const button: React.CSSProperties = {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      margin: '5px',
    }
  
    // Toggle Switch styles
    export const switchContainer: React.CSSProperties = {
      position: 'relative',
      display: 'inline-block',
      width: 60,
      height: 34,
    }
  
    export const switchInput: React.CSSProperties = {
      opacity: 0,
      width: 0,
      height: 0,
    }
  
    export const slider: React.CSSProperties = {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#ccc',
      transition: '.4s',
    }
  
    export const sliderBefore: React.CSSProperties = {
      position: 'absolute',
      content: '""',
      height: 26,
      width: 26,
      left: 4,
      bottom: 4,
      backgroundColor: 'white',
      transition: '.4s',
    }
  
    export const sliderChecked: React.CSSProperties = {
      backgroundColor: '#2196F3',
    }
  
    export const sliderFocus: React.CSSProperties = {
      boxShadow: '0 0 1px #2196F3',
    }
  
    export const sliderCheckedBefore: React.CSSProperties = {
      transform: 'translateX(26px)',
    }
  
    export const sliderRound: React.CSSProperties = {
      borderRadius: 34,
    }
  
    export const sliderRoundBefore: React.CSSProperties = {
      borderRadius: '50%',
    }
  }