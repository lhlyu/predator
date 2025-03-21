<template>
    <div class="flex h-full w-full flex-col">
        <div class="box-border h-[60px] w-full flex-shrink-0 border-b border-gray-200">
            <slot name="header"></slot>
        </div>
        <div class="h-[calc(100%-60px)] w-full flex-1">
            <slot></slot>
        </div>
    </div>
</template>
