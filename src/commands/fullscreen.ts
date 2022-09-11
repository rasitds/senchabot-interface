export default {
    name: 'fullscreen',
    args: '',
    run(arg: any) {
        var elem = document.documentElement;
        if (document.fullscreenElement) {
            if (document.exitFullscreen) document.exitFullscreen();
        } else {
            if ((document.fullscreenEnabled) && (elem.requestFullscreen)) elem.requestFullscreen();
        }
        return { lineText: "", outputText: [] };
    },
};