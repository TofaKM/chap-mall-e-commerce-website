import Navigation from "./component/nav/Navigation"

function Layout ({children}){
    return(
        <>
        <Navigation />
        {children}
        </>
    )
}
export default Layout