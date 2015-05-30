(function() {
    jQuery("#generate").on("click", generate);
    function generate() {
        var input = extractInput(),
            content = generateContent(input);
        injectContent(content);
    }

    function generateContent(inputObject) {
        //TODO avoid script injection
        var templateTitle = "@subject 導致暴力行為？！？！",
            template = "近日社會驚傳悲劇，在創傷之中，我們勢必要檢討悲劇的成因，才能防範於未然。<br/>經過本台記者獨家採訪後，歸納出一明確的事實。<br/><br/>在採訪兇嫌之親朋好友並深入了解兇嫌之日常行為後，本台記者發現，兇手平日的嗜好就是@shortTerm！<br/><br/>而進一步歸納近年台灣相關犯罪後，發現其加害者，都@fullTerm！<br/>是的，他們都@fullTerm！<br/><br/>當本台記者實際體驗並@shortTerm後，發現@fullTerm的人的確有類似之處。<br/>是否@subject就是導至這樣犯罪行為的主因呢？<br/><br/>雖沒有明確結論，但這的確值得我們深刻探討並進一步研究。",
            title,
            text;
        title = generateFromTemplate(templateTitle, inputObject);
        text = generateFromTemplate(template, inputObject);
        return {text: text, title: title};
    }

    function generateFromTemplate(template, inputObject) {
        return template
                .split("@subject").join(inputObject.subject)
                .split("@shortTerm").join(inputObject.shortTerm)
                .split("@fullTerm").join(inputObject.fullTerm);
    }

    function injectContent(content) {
        //TODO avoid script injection
        jQuery("#newsTitle").html(content.title);
        jQuery("#content").html(content.text);
    }

    function extractInput() {
        //TODO avoid script injection
        var verb = valueOrPlaceholder(jQuery("#verb")),
            adv = valueOrPlaceholder(jQuery("#adv")),
            subject =valueOrPlaceholder(jQuery("#subject")),
            fullTerm = verb + adv + subject,
            shortTerm = verb+subject;

        return {
            verb: verb,
            adv: adv,
            subject: subject,
            shortTerm: shortTerm,
            fullTerm: fullTerm
        };

    }

    function valueOrPlaceholder($obj) {
        var value = $obj.val();
        value = value || $obj.attr("placeholder");
        return value;
    }
}());