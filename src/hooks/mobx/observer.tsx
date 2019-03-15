import * as React from "react";

import {forwardRef, memo, useEffect, useMemo, useState} from "react";

import {observable, Reaction} from "mobx";
import {isUsingStaticRendering} from "./staticRendering";
import {useObserver} from "./useObserver";

export interface ObserverOptions {
    readonly forwardRef?: boolean;
}

export function observer<P extends object, TRef= {}>(baseComponent: React.RefForwardingComponent<TRef, P>, options: ObserverOptions)
    : React.MemoExoticComponent<React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<TRef>>>;

export function observer<P extends object>(
    baseComponent: React.FunctionComponent<P>,
    options?: ObserverOptions
): React.FunctionComponent<P>;

export function observer<P extends object, TRef = {}>(
    baseComponent: React.RefForwardingComponent<TRef, P>,
    options?: ObserverOptions
) {
    // The working of observer is explaind step by step in this talk: https://www.youtube.com/watch?v=cPF4iBedoF0&feature=youtu.be&t=1307
    if (isUsingStaticRendering()) {
        return baseComponent;
    }

    const realOptions = {
        forwardRef: false,
        ...options,
    };

    const baseComponentName = baseComponent.displayName || baseComponent.name;

    const wrappedComponent = (props: P, ref: React.Ref<TRef>) => {
        return useObserver(() => baseComponent(props, ref), baseComponentName);
    };

    // memo; we are not intested in deep updates
    // in props; we assume that if deep objects are changed,
    // this is in observables, which would have been tracked anyway
    let memoComponent;
    if (realOptions.forwardRef) {
        // we have to use forwardRef here because:
        // 1. it cannot go before memo, only after it
        // 2. forwardRef converts the function into an actual component, so we can't let the baseComponent do it
        //    since it wouldn't be a callable function anymore
        memoComponent = memo(forwardRef(wrappedComponent));
    } else {
        memoComponent = memo(wrappedComponent);
    }

    memoComponent.displayName = baseComponentName;
    return memoComponent;
}
/*
{
    // memo; we are not intested in deep updates
    // in props; we assume that if deep objects are changed,
    // this is in observables, which would have been tracked anyway
    return memo(props => {
        // forceUpdate 2.0
        const forceUpdate = useForceUpdate();

        // create a Reaction once, and memoize it
        const reaction = useMemo(
            () =>
                // If the Reaction detects a change in dependency,
                // force a new render
                new Reaction(
                    `observer(${baseComponent.displayName || baseComponent.name})`,
                    forceUpdate
                ),
            []
        );

        // clean up the reaction if this component is unMount
        useUnmount(() => reaction.dispose());

        // render the original component, but have the
        // reaction track the observables, so that rendering
        // can be invalidated (see above) once a dependency changes
        let rendering;
        reaction.track(() => {
            rendering = baseComponent(props);
        });
        return rendering;
    });
}
*/
