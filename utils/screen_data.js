// 数据筛选

import {
    bus
} from "~/utils/event";

export const screen = {
    methods: {
        emp_data() {
            bus.$on('empty_data', (index, text) => {
                if (text == this.allcost.name) {
                    let span = this.$refs.span;
                    span[index].classList.remove('show')
                }

            })
        },


        removeClass() {
            let span = this.$refs.span;
            span.forEach((val, i) => {
                if (val.classList.contains("show")) {
                    val.classList.remove("show");
                }
            });
        },
        clear_all() {
            bus.$on("clear", data => {
                this.removeClass()
            });
        }
    },
    mounted () {
        this.clear_all();
    }
}