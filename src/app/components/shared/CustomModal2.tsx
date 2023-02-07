import { FunctionComponent, PropsWithChildren } from "react";
import { Modal } from "react-native";

const CustomModal2: FunctionComponent<PropsWithChildren> = ({children}) => {
    return (
    <Modal animationType={'fade'} visible={true} transparent={false} animated={false} style={{position: 'relative', top: 0}} >
        {children}
    </Modal>
    )
}

export default CustomModal2;