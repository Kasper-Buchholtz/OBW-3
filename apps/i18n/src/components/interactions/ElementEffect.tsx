



import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

type ElementEffectProps = {
    children: ReactNode;
    delay?: number;
    duration?: number;
};

const ElementEffect = ({
    children,
    delay = 0,
    duration = 0.5,
}: ElementEffectProps) => {
    return (
        <motion.span
            aria-label={typeof children === 'string' ? children : undefined}
            className="overflow-hidden relative"
            transition={{
                delay,
                duration,
                ease: [0.87, 0, 0.13, 1],
            }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        >
            <span className="inline-block">{children}</span>
        </motion.span>
    );
};

export default ElementEffect;