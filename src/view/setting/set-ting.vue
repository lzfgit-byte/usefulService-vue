<template>
    <div class="container">
        <var-form ref="form" :disabled="disabled" :readonly="readonly" scroll-to-error="start">
            <var-space direction="column" :size="[14, 0]">
                <var-cell icon="cog" title="是否显示隐藏文件夹">
                    <template #extra>
                        <var-switch v-model="formData.isShowHidden" />
                    </template>
                </var-cell>
            </var-space>
        </var-form>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref } from '@vue/reactivity';
    import { watch } from 'vue';
    import settingApis from '@/view/setting/const/setting-apis';
    import { getPostDataExt } from '@/utils/httpUtil';
    import { ResultEntity } from '@/const/type';
    import { configStr2boolean } from '@/utils/KitUtil';
    import { settings } from '@/view/setting/const/setting-types';

    const disabled = ref(false);
    const readonly = ref(false);

    const formData = reactive<settings>({ isShowHidden: false });
    watch(formData, () => {
        getPostDataExt(settingApis.set, formData);
    });
    getPostDataExt(settingApis.listConfig, {}).then((res: ResultEntity) => {
        formData.isShowHidden = configStr2boolean(res?.data?.isShowHidden);
    });
</script>

<style scoped lang="less">
    .container {
        height: 80vh;
    }
</style>
