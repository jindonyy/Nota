import { BsPencilSquare } from 'react-icons/bs';
import { FaArrowDown, FaArrowUp, FaUser } from 'react-icons/fa6';
import { RiSendPlaneFill } from 'react-icons/ri';

const component = {
    pencil: BsPencilSquare,
    send: RiSendPlaneFill,
    up: FaArrowUp,
    down: FaArrowDown,
    user: FaUser,
};

const sizes = {
    default: '20px',
    sm: '14px',
    lg: '24px',
};

const colors = {
    primary: 'text-primary-foreground',
    secondary: 'text-secondary-foreground',
    muted: 'text-muted',
};

interface Props {
    variant?: keyof typeof component;
    size?: keyof typeof sizes;
    color?: keyof typeof colors;
}

export default function Icon(props: Props) {
    const { variant = 'up', size = 'default', color = 'primary' } = props;
    const Component = component[variant];

    return Component ? <Component size={sizes[size]} className={colors[color]} /> : null;
}
