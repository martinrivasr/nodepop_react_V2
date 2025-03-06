export default function portalStyles (sourceDoc: Document, targetDoc: Document){
    Array.from(sourceDoc.styleSheets).forEach((StyleSheet) =>{
        if(StyleSheet.cssRules){
            const newStyleEl = sourceDoc.createElement("style");
            Array.from(StyleSheet.cssRules).forEach((cssrule) => {
                newStyleEl.appendChild(sourceDoc.createTextNode(cssrule.cssText));
            });
            targetDoc.head.appendChild(newStyleEl);
        } else if(StyleSheet.href){
            const newlinkEl = sourceDoc.createElement("link");
            newlinkEl.rel = "stylesheet";
            newlinkEl.href = StyleSheet.href;
            targetDoc.head.appendChild(newlinkEl)
        }
    });
}