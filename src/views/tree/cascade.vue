<template>
    <div class="p-10px w-full overflow-auto h-full">
        <div class="h-455px flex flex-col border-1px border-solid border-#eee w-885px">
            <div class="h-42px flex items-center bg-#F4F7FA pl-15px pr-25px">
                <div class="flex items-center">
                    <el-checkbox v-model="checked" @change="changeAll">全选商品</el-checkbox>
                    （{{ getCheckAll }}/{{ lastLevelTotalCount }}）
                </div>

                <div class="ml-auto flex items-center cursor-pointer" @click="changeAll(false)">
                    <i class="el-icon-delete"></i>
                    <div class="text-14px ml-5px">清除</div>
                </div>
            </div>

            <div class="flex-1 h-0">
                <cascadePanel :datalist="dataList">
                    <template #list="slotProps">
                        <div class="min-w-120px pl-15px h-32px cursor-pointer flex items-center">
                            <el-checkbox :indeterminate="getCheckStatus(slotProps.data)"
                                v-model="slotProps.data.isChecked"
                                @change="(e) => getData(e, slotProps.data)"></el-checkbox>
                            <div class="ml-10px">{{ slotProps.data.label }}</div>
                            <div v-if="slotProps.data.level && slotProps.data.level == 1">（{{
                        getLastCheck(slotProps.index) }}）</div>
                        </div>
                    </template>
                </cascadePanel>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import cascadePanel from './components/cascadePanel.vue'

// 全选的
const checked = ref(false)

// 已经勾选的最后一级的value
const selectedItems = ref(['3', '4'])

// 待选择
const dataList = ref([
    {
        value: '1',
        label: '指南',
        level: 1,
        isChecked: false,
        children: [
            {
                value: '2',
                label: '设计原则',
                isChecked: false,
                parent: null,
                children: [
                    {
                        value: '3',
                        label: '一致',
                        isChecked: false,
                        parent: null,
                        children: [],
                    },
                    {
                        value: '4',
                        label: '反馈',
                        isChecked: false,
                        parent: null,
                        children: [],
                    },
                ],
            },
            {
                value: '5',
                label: '导航',
                isChecked: false,
                parent: null,
                children: [
                    {
                        value: '6',
                        label: '侧向导航',
                        isChecked: false,
                        parent: null,
                        children: [],
                    },
                ],
            },
        ],
    },

    {
        value: '10',
        label: '测试',
        level: 1,
        isChecked: false,
        children: [
            {
                value: '11',
                label: '测试11',
                isChecked: false,
                parent: null,
                children: [],
            },
            {
                value: '12',
                label: '测试22',
                isChecked: false,
                parent: null,
                children: [],
            },
        ],
    },
])

// 计算属性
const getLastCheck = (i) => {
    let total = 0;

    function countLastLevelChecked(node) {
        if (node.children?.length > 0) {
            node.children.forEach((child) => {
                countLastLevelChecked(child);
            });
        } else {
            if (node.isChecked) {
                total++;
            }
        }
    }
    countLastLevelChecked(dataList.value[i]);

    return total;
};

const getCheckAll = computed(() => {
    let total = 0;
    for (let i in dataList.value) {
        total += getLastCheck(i);
    }
    return total;
});

const lastLevelTotalCount = computed(() => {
    let total = 0;

    const countLastLevelNodes = (node, level) => {
        if (node.children?.length > 0) {
            node.children.forEach((child) => {
                countLastLevelNodes(child, level + 1);
            });
        } else {
            total++;
        }
    };

    dataList.value.forEach((node) => {
        countLastLevelNodes(node, 0);
    });

    return total;
});



watch(dataList, (newVal, oldVal) => {
    selectedItems.value = [];
    collectSelectedNodes(newVal);
    console.log(selectedItems.value, 'gouxun');
}, { deep: true });

onMounted(() => {
    for (let i of dataList.value) {
        addParentRef(i)
        echoData(i)
    }
})


// 方法
const getCheckStatus = (tree) => {
    if (tree.children && tree.children.length > 0) {
        if (!tree.children.every((child) => child.isChecked)) {
            for (const node of tree.children) {
                if (node.isChecked) {
                    return true;
                }
                if (node.children && node.children.length > 0) {
                    const childResult = getCheckStatus(node);
                    if (childResult) {
                        return true;
                    }
                }
            }
        } else {
            return false;
        }
    }
    return false;
};

const getData = (isChecked, data) => {
    if (data.children?.length > 0) {
        data.isChecked = isChecked;
        data.children.forEach((item) => {
            getData(isChecked, item);
        });
        if (data.parent) {
            updateParent(data);
        }
    } else {
        data.isChecked = isChecked;
        if (data.parent) {
            updateParent(data);
        }
    }
};

const updateParent = (node) => {
    if (node.parent) {
        const parent = node.parent;
        if (parent.children.every((child) => child.isChecked)) {
            parent.isChecked = true;
        } else {
            parent.isChecked = false;
        }
        updateParent(parent); // 递归更新父节点的 isChecked 属性
    }
};

const collectSelectedNodes = (nodes) => {
    nodes.forEach((node) => {
        if (node.isChecked && node.children.length === 0) {
            selectedItems.value.push(node.value);
        }
        if (node.children && node.children.length > 0) {
            collectSelectedNodes(node.children);
        }
    });
};

const echoData = (node) => {
    if (selectedItems.value.includes(node.value)) {
        node.isChecked = true;
    } else {
        node.isChecked = false;
    }
    if (node.parent) {
        updateParent(node);
    }
    if (node.children && node.children.length > 0) {
        node.children.forEach((child) => echoData(child));
    }
};

const addParentRef = (node, parent) => {
    node.parent = parent;
    if (node.children) {
        node.children.forEach((child) => addParentRef(child, node));
    }
};

const changeAll = (e) => {
    for (let i of dataList.value) {
        getData(e, i);
    }
    if (!e) {
        checked.value = false;
    }
};
</script>

<style></style>
