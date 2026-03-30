import * as React from "react";

export interface DesignSystemIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  color?: string;
  fill?: string;
  props?: { [key: string]: any };
}

export const Icon24Folder = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><path fill="none" stroke="currentColor" strokeWidth={2} d="M21,22H3a2,2,0,0,1-2-2V2H9l3,4H23V20A2,2,0,0,1,21,22Z" /></g></svg>
);

export const IconArrowLeft = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><line x1={22} x2={2} y1={12} y2={12} fill="none" stroke="currentColor" strokeWidth={2} data-cap="butt" data-color="color-2" /><polyline fill="none" stroke="currentColor" strokeWidth={2} points="9,19 2,12 9,5 " /></g></svg>
);

export const IconArrowRight = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><line x1={2} x2={22} y1={12} y2={12} fill="none" stroke="currentColor" strokeWidth={2} data-cap="butt" data-color="color-2" /><polyline fill="none" stroke="currentColor" strokeWidth={2} points="15,5 22,12 15,19 " /></g></svg>
);

export const IconArrowSmDown = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><polyline fill="none" stroke="currentColor" strokeWidth={2} points="16,10 12,14 8,10 " transform="translate(0, 0)" /></g></svg>
);

export const IconArrowSmRight = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><polyline fill="none" stroke="currentColor" strokeWidth={2} points="10,8 14,12 10,16 " transform="translate(0, 0)" /></g></svg>
);

export const IconBan = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><line x1={19.8} x2={4.2} y1={4.2} y2={19.8} fill="none" stroke="currentColor" strokeWidth={2} data-cap="butt" /><circle cx={12} cy={12} r={11} fill="none" stroke="currentColor" strokeWidth={2} /></g></svg>
);

export const IconCCheck = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><polyline fill="none" stroke="currentColor" strokeWidth={2} points=" 6,12 10,16 18,8 " data-color="color-2" /><circle cx={12} cy={12} r={11} fill="none" stroke="currentColor" strokeWidth={2} /></g></svg>
);

export const IconDCheck = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><polyline fill="none" stroke="currentColor" strokeWidth={2} points="6,12 10,16 18,8 " /></g></svg>
);

export const IconDocFolder = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><path fill="none" stroke="currentColor" strokeWidth={2} d="M3,22a2.006,2.006,0,0,1-2-2V2H7L9,5H20V6" data-color="color-2" /><path fill="none" stroke="currentColor" strokeWidth={2} d="M5,9V20a2.006,2.006,0,0,1-2,2H21a2.006,2.006,0,0,0,2-2V9Z" /></g></svg>
);

export const IconDotsAnim = ({ width, height, color, ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} {...props}><g fill="currentColor" className="nc-icon-wrapper"><g className="nc-loop-dots-24-icon-f"><circle cx={4} cy={12} r={3} fill="currentColor" /><circle cx={12} cy={12} r={3} fill="currentColor" data-color="color-2" /><circle cx={20} cy={12} r={3} fill="currentColor" /></g><style>{".nc-loop-dots-24-icon-f{--animation-duration:1s}.nc-loop-dots-24-icon-f *{opacity:.4transform:scale(.7)}.nc-loop-dots-24-icon-f :nth-child(1),.nc-loop-dots-24-icon-f :nth-child(3){animation:nc-loop-dots-anim-2b var(--animation-duration) infinite linear}.nc-loop-dots-24-icon-f :nth-child(1){transform-origin:4px 12px}.nc-loop-dots-24-icon-f :nth-child(2){animation:nc-loop-dots-anim-1b calc(var(--animation-duration)/2) infinite linear;animation-delay:calc(var(--animation-duration)/4);transform-origin:12px 12px}.nc-loop-dots-24-icon-f :nth-child(3){animation-delay:calc(var(--animation-duration)/2);transform-origin:20px 12px}@keyframes nc-loop-dots-anim-1b{0%,100%{opacity:.4;transform:scale(.7)}50%{opacity:1;transform:scale(1)}}@keyframes nc-loop-dots-anim-2b{0%,100%,66%{opacity:.4;transform:scale(.7)}33%{opacity:1;transform:scale(1)}}"}</style></g></svg>
);

export const IconDownloadData = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><line x1={12} x2={12} y1={6} y2={17} fill="none" stroke="currentColor" strokeWidth={2} data-cap="butt" data-color="color-2" /><polyline fill="none" stroke="currentColor" strokeWidth={2} points="8 13 12 17 16 13" data-color="color-2" /><path fill="none" stroke="currentColor" strokeWidth={2} d="M2,8V4A2,2,0,0,1,4,2H8" /><path fill="none" stroke="currentColor" strokeWidth={2} d="M16,2h4a2,2,0,0,1,2,2V8" /><path fill="none" stroke="currentColor" strokeWidth={2} d="M22,16v4a2,2,0,0,1-2,2H16" /><path fill="none" stroke="currentColor" strokeWidth={2} d="M8,22H4a2,2,0,0,1-2-2V16" /></g></svg>
);

export const IconEAdd = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><line x1={12} x2={12} y1={2} y2={22} fill="none" stroke="currentColor" strokeWidth={2} /><line x1={22} x2={2} y1={12} y2={12} fill="none" stroke="currentColor" strokeWidth={2} /></g></svg>
);

export const IconERemove = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" className="nc-icon-wrapper"><path fill="currentColor" d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z" /></g></svg>
);

export const IconFile = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={fill} className="svgicon" viewBox="0 0 16 16" width={width} height={height} color={color} {...props}><path fill="currentColor" fillRule="evenodd" d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clipRule="evenodd" /></svg>
);

export const IconGear = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><path fill="none" stroke="currentColor" strokeWidth={2} d="M23,12c0-1.105-0.895-2-2-2 h-1.262c-0.189-0.732-0.477-1.422-0.852-2.058l0.892-0.892c0.781-0.781,0.781-2.047,0-2.828c-0.781-0.781-2.047-0.781-2.828,0 l-0.892,0.892C15.422,4.739,14.732,4.451,14,4.262V3c0-1.104-0.895-2-2-2c-1.105,0-2,0.895-2,2v1.262 C9.268,4.451,8.578,4.739,7.942,5.114L7.05,4.222c-0.781-0.781-2.047-0.781-2.828,0c-0.781,0.781-0.781,2.047,0,2.828l0.892,0.892 C4.739,8.578,4.451,9.268,4.262,10H3c-1.104,0-2,0.895-2,2c0,1.105,0.895,2,2,2h1.262c0.189,0.732,0.477,1.422,0.852,2.058 L4.222,16.95c-0.781,0.781-0.781,2.047,0,2.828c0.781,0.781,2.047,0.781,2.828,0l0.892-0.892c0.635,0.375,1.326,0.663,2.058,0.852 V21c0,1.104,0.895,2,2,2c1.105,0,2-0.895,2-2v-1.262c0.732-0.189,1.422-0.477,2.058-0.852l0.892,0.892 c0.781,0.781,2.047,0.781,2.828,0c0.781-0.781,0.781-2.047,0-2.828l-0.892-0.892c0.375-0.635,0.663-1.326,0.852-2.058H21 C22.104,14,23,13.105,23,12z" /><circle cx={12} cy={12} r={3} fill="none" stroke="currentColor" strokeWidth={2} data-color="color-2" /></g></svg>
);

export const IconLaunch = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><line x1={11} x2={22} y1={13} y2={2} fill="none" stroke="currentColor" strokeWidth={2} data-cap="butt" data-color="color-2" /><polyline fill="none" stroke="currentColor" strokeWidth={2} points="14 2 22 2 22 10" data-color="color-2" /><path fill="none" stroke="currentColor" strokeWidth={2} d="M9,4H4A2,2,0,0,0,2,6V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V15" /></g></svg>
);

export const IconLock = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><rect width={18} height={12} x={3} y={11} fill="none" stroke="currentColor" strokeWidth={2} rx={2} /><circle cx={12} cy={17} r={2} fill="none" stroke="currentColor" strokeWidth={2} data-color="color-2" /><path fill="none" stroke="currentColor" strokeWidth={2} d="M17,7V6a4.951,4.951,0,0,0-4.9-5H12A4.951,4.951,0,0,0,7,5.9V7" data-color="color-2" /></g></svg>
);

export const IconMove3 = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" className="nc-icon-wrapper"><circle cx={12} cy={12} r={3} fill="currentColor" data-color="color-2" /><path fill="currentColor" d="M12.372.165a.52.52,0,0,0-.744,0l-4.5,5A.5.5,0,0,0,7.5,6h9a.5.5,0,0,0,.372-.835Z" /><path fill="currentColor" d="M18.834,7.128a.508.508,0,0,0-.538-.085A.5.5,0,0,0,18,7.5v9a.5.5,0,0,0,.3.457.522.522,0,0,0,.2.043.5.5,0,0,0,.334-.128l5-4.5a.5.5,0,0,0,0-.744Z" /><path fill="currentColor" d="M16.5,18h-9a.5.5,0,0,0-.372.835l4.5,5a.5.5,0,0,0,.744,0l4.5-5A.5.5,0,0,0,16.5,18Z" /><path fill="currentColor" d="M5.7,7.043a.509.509,0,0,0-.538.085l-5,4.5a.5.5,0,0,0,0,.744l5,4.5A.5.5,0,0,0,5.5,17a.522.522,0,0,0,.2-.043A.5.5,0,0,0,6,16.5v-9A.5.5,0,0,0,5.7,7.043Z" /></g></svg>
);

export const IconOWarning = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><polygon fill="none" stroke="currentColor" strokeWidth={2} points="16.556 1 7.444 1 1 7.444 1 16.556 7.444 23 16.556 23 23 16.556 23 7.444 16.556 1" /><line x1={12} x2={12} y1={7} y2={13} fill="none" stroke="currentColor" strokeWidth={2} data-color="color-2" /><circle cx={12} cy={17} r={1} fill="currentColor" stroke="none" data-color="color-2" data-stroke="none" /></g></svg>
);

export const IconPencil = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><line x1={14.328} x2={19.328} y1={4.672} y2={9.672} fill="none" stroke="currentColor" strokeWidth={2} data-cap="butt" data-color="color-2" /><path fill="none" stroke="currentColor" strokeWidth={2} d="M8,21,2,22l1-6L16.414,2.586a2,2,0,0,1,2.828,0l2.172,2.172a2,2,0,0,1,0,2.828Z" /></g></svg>
);

export const IconText = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><line x1={3} x2={21} y1={2} y2={2} fill="none" stroke="currentColor" strokeWidth={2} /><line x1={12} x2={12} y1={2} y2={22} fill="none" stroke="currentColor" strokeWidth={2} /></g></svg>
);

export const IconUpload = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><line x1={12} x2={12} y1={2} y2={16} fill="none" stroke="currentColor" strokeWidth={2} data-cap="butt" data-color="color-2" /><polyline fill="none" stroke="currentColor" strokeWidth={2} points="8 6 12 2 16 6" data-color="color-2" /><path fill="none" stroke="currentColor" strokeWidth={2} d="M17,10h3a2,2,0,0,1,2,2v8a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V12a2,2,0,0,1,2-2H7" /></g></svg>
);

export const IconUserFocus = ({ width, height, color, fill = "currentColor", ...props }: DesignSystemIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className="svgicon" viewBox="0 0 24 24" color={color} fill={fill} {...props}><g fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className="nc-icon-wrapper"><path fill="none" stroke="currentColor" strokeWidth={2} d="M12,13h0c-2.485,0-4.5,2.015-4.5,4.5v.5h9v-.5c0-2.485-2.015-4.5-4.5-4.5Z" data-color="color-2" /><circle cx={12} cy={7.5} r={2.5} fill="none" stroke="currentColor" strokeWidth={2} data-color="color-2" /><path fill="none" stroke="currentColor" strokeWidth={2} d="M2,8V4c0-1.105,.895-2,2-2h4" /><path fill="none" stroke="currentColor" strokeWidth={2} d="M16,2h4c1.105,0,2,.895,2,2v4" /><path fill="none" stroke="currentColor" strokeWidth={2} d="M22,16v4c0,1.105-.895,2-2,2h-4" /><path fill="none" stroke="currentColor" strokeWidth={2} d="M8,22H4c-1.105,0-2-.895-2-2v-4" /></g></svg>
);

export const designSystemIcons = {
  Icon24Folder,
  IconArrowLeft,
  IconArrowRight,
  IconArrowSmDown,
  IconArrowSmRight,
  IconBan,
  IconCCheck,
  IconDCheck,
  IconDocFolder,
  IconDotsAnim,
  IconDownloadData,
  IconEAdd,
  IconERemove,
  IconFile,
  IconGear,
  IconLaunch,
  IconLock,
  IconMove3,
  IconOWarning,
  IconPencil,
  IconText,
  IconUpload,
  IconUserFocus,
} as const;

export type DesignSystemIconName = keyof typeof designSystemIcons;