import React, { useState } from 'react';
import {Styles} from 'app/Style';

interface ToggleSwitchProps {
  initialState?: boolean;
  onChange?: (checked: boolean) => void;
  round?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ initialState = false, onChange, round = false }) => {
  const [checked, setChecked] = useState(initialState);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const getSliderStyle = (): React.CSSProperties => {
    const baseStyle = { ...Styles.slider };
    
    if (round) {
      return { ...baseStyle, ...Styles.sliderRound };
    }
    
    return baseStyle;
  };

  // We need to create a custom element that renders the circle inside the slider
  // since we can't use :before pseudo-element with inline styles
  const renderSliderCircle = () => {
    const baseStyle = { ...Styles.sliderBefore };
    
    if (checked) {
      baseStyle.transform = Styles.sliderCheckedBefore.transform;
    }
    
    if (round) {
      baseStyle.borderRadius = Styles.sliderRoundBefore.borderRadius;
    }
    
    return <div style={baseStyle}></div>;
  };

  return (
    <label style={Styles.switchContainer}>
      <input
        type="checkbox"
        style={Styles.switchInput}
        checked={checked}
        onChange={handleChange}
      />
      <div
        style={{
          ...getSliderStyle(),
          backgroundColor: checked ? Styles.sliderChecked.backgroundColor : Styles.slider.backgroundColor,
        }}
      >
        {renderSliderCircle()}
      </div>
    </label>
  );
};
