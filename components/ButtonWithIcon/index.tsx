import styles from './style.module.css';

type Props = {
    color: string;
    leftIcon?: string; 
    rightIcon?: string;
    value: string;
    onClick?: ()=> void;
    fill?: boolean;
}

export const ButtonWithIcon = (
    {color, leftIcon, rightIcon, value, onClick, fill}
     : Props) => {

    return(
        <div className={styles.container}
            style={{backgroundColor : fill ? color : '#F9F9FB'}}
            onClick={onClick}
        >
            <div className={styles.leftSide}
                style={{backgroundColor: fill ? 'rgba(0,0,0,0.1)' : '#FFFFFF'}}
            >
                {leftIcon != null &&
                    <img className={styles.iconCostumation} src={`/assets/icons/${leftIcon}.png`} />
                }
            </div>
            <div 
                className={styles.centerSide}
                style={{color : fill ? '#FFFFFF' : '#1B1B1B'}}
            >
                {value}
            </div>
            <div className={styles.rightSide}>
            {rightIcon != null &&
                    <img className={styles.iconCostumation} src={`/assets/icons/${rightIcon}.png`} />
                }
            </div>
        </div>
    )
}