import { TextInputProps, ViewStyle, TextStyle, TextInput } from 'react-native';

interface IAppTextInput extends TextInputProps {
    containerStyle?: ViewStyle;
    textInputStyle?: TextStyle;
    error?: any;
    messageError?: string;
    hasShadow?: boolean;
    label?: string;
    styleViewInput?: ViewStyle;
    children?: React.ReactElement;
    refCallback?: React.LegacyRef<TextInput> | undefined,
    isSecure?: boolean,
    iconLeft?: React.ReactElement,
    styleTextError?: TextStyle,
    // mask props
    mask?: Array<any>,
    placeholderFillCharacter?: string,
    obfuscationCharacter?: string,
    showObfuscatedValue?: boolean,
    // End mask

    // check hidden clearMode
    hiddenClearMode?: boolean,
    // 
}

function AppTextInput(props: IAppTextInput): JSX.Element;

export default React.memo(AppTextInput);