// 节流阀
let _percentFlag = false

function _essayScroll() {
	const _scrollTop = document.documentElement.scrollTop || window.pageYOffset // 卷去高度
	const _result = 99

	const r = window.scrollY + document.documentElement.clientHeight

	const p = document.getElementById('post-comment') || document.getElementById('footer')

	if (p && (p.offsetTop + p.offsetHeight / 2 < r || _result > 90)) {
		_percentFlag = true
	}
}

function replaceAll(e, n, t) {
	return e.split(n).join(t)
}

const anzhiyu = {
	diffDate(d, more = false) {
		const dateNow = new Date()
		const datePost = new Date(d)
		const dateDiff = dateNow.getTime() - datePost.getTime()
		const minute = 1000 * 60
		const hour = minute * 60
		const day = hour * 24
		const month = day * 30

		let result
		if (more) {
			const monthCount = dateDiff / month
			const dayCount = dateDiff / day
			const hourCount = dateDiff / hour
			const minuteCount = dateDiff / minute

			if (monthCount >= 1) {
				result = datePost.toLocaleDateString().replace(/\//g, '-')
			}
			else if (dayCount >= 1) {
				result = `${Number.parseInt(dayCount)} 天前`
			}
			else if (hourCount >= 1) {
				result = `${Number.parseInt(hourCount)} 小时前`
			}
			else if (minuteCount >= 1) {
				result = `${Number.parseInt(minuteCount)} 分钟前`
			}
			else {
				result = '刚刚'
			}
		}
		else {
			result = Number.parseInt(dateDiff / day)
		}
		return result
	},
	changeTimeInEssay() {
		const bber = document.querySelector('#bber')
		if (bber) {
			document.querySelectorAll('#bber time').forEach((e) => {
				const datetime = e.getAttribute('datetime')
				if (datetime) {
					e.textContent = anzhiyu.diffDate(datetime, true)
					e.style.display = 'inline'
				}
			})
		}
	},
	commentText(e) {
		if (e === 'undefined' || e === 'null') {
			e = '好棒！'
		}
		const n = document.getElementsByClassName('el-textarea__inner')[0]
		if (!n)
			return

		const t = document.createEvent('HTMLEvents')
		t.initEvent('input', true, true)
		const o = replaceAll(e, '\n', '\n> ')
		n.value = `> ${o}\n\n`
		n.dispatchEvent(t)

		const commentElement = document.querySelector('#post-comment')
		if (commentElement) {
			const i = commentElement.offsetTop
			window.scrollTo(0, i - 80)
			n.focus()
			n.setSelectionRange(-1, -1)

			const commentTips = document.getElementById('comment-tips')
			if (commentTips) {
				commentTips.classList.add('show')
			}
		}
	},
}

anzhiyu.changeTimeInEssay()
