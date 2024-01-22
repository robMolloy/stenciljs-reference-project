/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { MatchResults } from "@stencil-community/router";
export namespace Components {
    interface AppRoot {
    }
    interface ErrorPage {
    }
    interface HomePage {
    }
    interface ProfilePage {
        "match"?: MatchResults;
    }
}
declare global {
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLErrorPageElement extends Components.ErrorPage, HTMLStencilElement {
    }
    var HTMLErrorPageElement: {
        prototype: HTMLErrorPageElement;
        new (): HTMLErrorPageElement;
    };
    interface HTMLHomePageElement extends Components.HomePage, HTMLStencilElement {
    }
    var HTMLHomePageElement: {
        prototype: HTMLHomePageElement;
        new (): HTMLHomePageElement;
    };
    interface HTMLProfilePageElement extends Components.ProfilePage, HTMLStencilElement {
    }
    var HTMLProfilePageElement: {
        prototype: HTMLProfilePageElement;
        new (): HTMLProfilePageElement;
    };
    interface HTMLElementTagNameMap {
        "app-root": HTMLAppRootElement;
        "error-page": HTMLErrorPageElement;
        "home-page": HTMLHomePageElement;
        "profile-page": HTMLProfilePageElement;
    }
}
declare namespace LocalJSX {
    interface AppRoot {
    }
    interface ErrorPage {
    }
    interface HomePage {
    }
    interface ProfilePage {
        "match"?: MatchResults;
    }
    interface IntrinsicElements {
        "app-root": AppRoot;
        "error-page": ErrorPage;
        "home-page": HomePage;
        "profile-page": ProfilePage;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "error-page": LocalJSX.ErrorPage & JSXBase.HTMLAttributes<HTMLErrorPageElement>;
            "home-page": LocalJSX.HomePage & JSXBase.HTMLAttributes<HTMLHomePageElement>;
            "profile-page": LocalJSX.ProfilePage & JSXBase.HTMLAttributes<HTMLProfilePageElement>;
        }
    }
}
