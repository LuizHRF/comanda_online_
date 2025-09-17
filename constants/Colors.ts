/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#C09891';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#1F1300',
    background: '#f4dbd8',
    contrast_backgroud: '#A53F2B',
    tint: tintColorLight,
    icon: '#C09891',
    tabIconDefault: '#C09891',
    tabIconSelected: tintColorLight,
    faintText : "#9F9F9F"
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    faintText : "#9F9F9F"
  },
};
