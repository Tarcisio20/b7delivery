import { useState } from 'react';
import styles from './styles.module.css';

type Props ={
    color : string;
    placeholder: string;
    value : string;
    onChange : (newValue: string)=> void;
    password?: boolean;
}

export const InputField = ({ color, placeholder, value, onChange, password} : Props) => {
    
    const [showPassword, setShowPassword] = useState(false)
    const [focused, setFocused] = useState(false)
    
    return (
        <div 
        className={styles.container}
        style={{
            borderColor:focused ? color : '#F9F9FB',
            backgroundColor: focused ? '#FFFFFF':'#F9F9FB'
        }}
        >
            <input
                type={password ? (showPassword ? 'text' : 'password') : 'text'}
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={()=>setFocused(true)}
                onBlur={()=>setFocused(false)}
            />
            {password && 
                <div className={styles.showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword && 
                        <img src="/tmp/fechar-o-olho.png" className={styles.img} />
                    }
                    {!showPassword && 
                        <img src="/tmp/olho.png" className={styles.img} />
                    }
                </div>
            }
        </div>
    )
}