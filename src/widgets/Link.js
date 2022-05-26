const Link = ({className, href, children}) => {
    const onClickHandler = (event) => {
        if(event.metaKey || event.ctrlKey) {
            return;
        }

        event.preventDefault();
        window.history.pushState({}, '', href);

        // These tow lines creates anavigation event to let know the app that url changed
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    return ( 
        <a onClick={onClickHandler} className={className} href={href}>
            {children}
        </a>
     );
}
 
export default Link;