type ButtonProps = {
    text: string;
    border?: boolean;
};

const Button: React.FC<ButtonProps> = ({ text, border = true }) => {
    let button;
    if (border) {
        button = (
            <div
                className={[
                    'border-2',
                    'border-black',
                    'rounded-lg',
                    'py-2',
                    'px-5',
                    'font-medium',
                    'hover:shadow-lg',
                    'hover:bg-gray-100',
                    'active:shadow-none',
                    'active:bg-gray-200',
                    'transition-all',
                    'duration-200',
                    'ease-linear',
                    'cursor-pointer',
                ].join(' ')}
            >
                {text}
            </div>
        );
    } else {
        button = (
            <div className='rounded-lg py-2 px-5 font-medium active:text-gray-500 cursor-pointer'>
                {text}
            </div>
        );
    }
    return button;
};

export default Button;
