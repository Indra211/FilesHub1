<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <button class="close" @click="closeModal">X</button>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(['close']);
const closeModal = () => {
    emit('close');
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    position: relative;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>