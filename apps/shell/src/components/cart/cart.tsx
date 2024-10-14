import React, { useEffect, useRef } from 'react';
import { mount } from 'cart/Module'

import { useLocation, useNavigate } from 'react-router-dom';
import { cartRoutingPrefix } from '../../constants/mfeRoutes';

const cartBaseName = `/${cartRoutingPrefix}`;

const Cart = () => {
  console.log({mount})
    const wrapperRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    // Listen to navigation events dispatched inside app1 mfe.
    useEffect(() => {
        const app1NavigationEventHandler = (event: Event) => {
            const pathname = (event as CustomEvent<string>).detail;

            const newPathname = `${cartBaseName}${pathname}`;

            if (newPathname === location.pathname) {
                return;
            }
            navigate(newPathname);
        };
        window.addEventListener('[cart] navigated', app1NavigationEventHandler);

        return () => {
            window.removeEventListener(
                '[cart] navigated',
                app1NavigationEventHandler
            );
        };
    }, [location, navigate]);

    // Listen for host location changes and dispatch a notification.
    useEffect(() => {
        if (location.pathname.startsWith(cartBaseName)) {
            window.dispatchEvent(
                new CustomEvent('[host] navigated', {
                    detail: location.pathname.replace(cartBaseName, ''),
                })
            );
        }
    }, [location]);

    const isFirstRunRef = useRef(true);

    const unmountRef = useRef(() => {
        /* */
    });

    useEffect(() => {
        const unmountFunction = unmountRef.current;
        return () => {
            unmountFunction();
        };
    }, []);

    useEffect(() => {
        if (!isFirstRunRef.current) {
            return;
        }
        unmountRef.current = mount({
            mountPoint: wrapperRef.current!,
            initialPathname: location.pathname.replace(cartBaseName, ''),
        });
        isFirstRunRef.current = false;
    }, [location]);

    return <div ref={wrapperRef} id="cart-app" />;
};

export default Cart;
