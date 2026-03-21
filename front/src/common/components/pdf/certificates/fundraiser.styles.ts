import { css } from "@emotion/react";
import { colors, Orbitron, sizes, spaces } from "../../../styles";

export const container = (isPreview: boolean) => css`
  font-family: "Orbitron", sans-serif;
  width: ${isPreview ? sizes.a4PreviewWidth : sizes.a4Width};
  height: ${isPreview ? sizes.a4PreviewWHeight : sizes.a4Height};

  h1 {
    ${isPreview && `font-size: ${sizes.xl}`}
  }

  h2 {
    ${isPreview && `font-size: ${sizes.l}`}
  }
  padding: ${spaces[5]};
`;
export const spacer = css`
  border-color: ${colors.black};
`;
export const titleStyles = css`
  ${Orbitron}
`;
export const statusText = (status: number) => {
  let color;
  if (status === 0) color = colors.black;
  else if (status === 1) color = colors.green;
  else if (status === 2) color = colors.red;
  else if (status === 3) color = colors.blue;
  return css`
    color: ${color};
  `;
};
