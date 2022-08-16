export function watermarkRT({
	// 使用 ES6 的函数默认值方式设置参数的默认取值
	// font = "normal bold 26px Microsoft Yahei",
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	container = document.getElementById('root')!,
	textAlign = 'center',
	textBaseline = 'Middle',
	font = 'normal 12px Arial',
	fillStyle = 'rgba(0, 0, 0, 0.08)',
	content = '大润发',
	zIndex = 1000,
} = {}) {
	// eslint-disable-next-line prefer-rest-params
	const args = arguments[0];
	const canvas = document.createElement('canvas');

	const angle = Math.PI / 9;

	canvas.height = window.screen.availHeight;
	canvas.width = window.screen.availWidth;

	const distanceX = 120 + 120; //  水印长度 + 横向间距；
	const distanceY = 80; //  水印 纵向间距;
	const numX = Math.ceil(canvas.width / Math.cos(angle) / distanceX) + 1;
	const gap = Math.ceil((canvas.height * Math.tan(angle)) / distanceX) + 1;
	const numY = Math.ceil(canvas.height / Math.cos(angle) / distanceY) + 4; //水印列数

	const ctx: any = canvas.getContext('2d');

	ctx.rotate(-angle);
	ctx.textAlign = textAlign;
	ctx.textBaseline = textBaseline;
	ctx.font = font;
	ctx.fillStyle = fillStyle;

	for (let i = 0; i < numX + gap; i++) {
		for (let j = 0; j < numY; j++) {
			const startY = 100 + j * distanceY;
			const startX = distanceX * (i - gap) + (j % 2 === 0 ? 0 : 100);
			ctx.fillText(`${content}`, startX, startY);
		}
	}

	const base64Url = canvas.toDataURL();
	const __wm = document.querySelector('.__wm');

	const watermarkDiv = __wm || document.createElement('div');
	const styleStr = `
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      font-weight:bold;
      z-index:${zIndex};
      pointer-events:none;
      background-repeat:repeat;
      background-image:url('${base64Url}')`;

	watermarkDiv.setAttribute('style', styleStr);
	watermarkDiv.classList.add('__wm');

	if (!__wm) {
		container.style.position = 'relative';
		container.insertBefore(watermarkDiv, container.firstChild);
	}

	const MutationObserver = window.MutationObserver;
	// const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	if (MutationObserver) {
		let mo: any = new MutationObserver(function () {
			const __wm = document.querySelector('.__wm');
			// 只在__wm元素变动才重新调用 __canvasWM
			if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
				// 避免一直触发
				mo.disconnect();
				mo = null;
				watermarkRT(JSON.parse(JSON.stringify(args)));
			}
		});

		mo.observe(container, {
			attributes: true,
			subtree: true,
			childList: true,
		});
	}
}
