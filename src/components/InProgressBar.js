import React from "react";
import { ProgressBar } from "react-native-paper";
import globalStyles from "../../utils/globalStyles";

const InProgressBar = ({ progressValue }) => {
  return (
    <ProgressBar
      class
      style={{
        height: 10,
        borderRadius: 2,
      }}
      progress={progressValue}
      color={globalStyles.primaryColor}
    />
  );
};

export default InProgressBar;
