import styles from './styles.module.css'

type Props = {
    color: string;
    label: string;
    icon: 'cart' | 'config' | 'fav' | 'logout' | 'menu' | 'order';
    onClick: ()=>void;
    disabled?: boolean;
}

export const SidebarMenuItem = ({color, label, icon, onClick, disabled} : Props) => {
    return(
        <div 
        className={styles.container}
        onClick={onClick}
        >   
            <div className={styles.area}>
                {icon === 'menu' && 
                    <img src={'/assets/icons/menu.png'} />
                }
                {icon === 'config' &&
                    <img src={'/assets/icons/config.png'} />
                }
                {icon === 'fav' &&
                    <img src={'/assets/icons/fav.png'} />
                }
                {icon === 'logout' &&
                    <img src={'/assets/icons/logout.png'} />
                }
                {icon === 'cart' &&
                    <img src={'/assets/icons/cart.png'} />
                }
                {icon === 'order' &&
                    <img src={'/assets/icons/order.png'} />
                }
                <span className={disabled ? styles.disabled : ''}>{label}</span>
            </div>
        </div>
    )
}