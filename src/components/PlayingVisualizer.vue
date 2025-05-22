<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    class="text-green-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <rect x="3" y="6" width="3" height="12">
      <animate
        attributeName="height"
        values="12;4;12"
        dur="1s"
        repeatCount="indefinite"
        begin="0s"
      />
      <animate attributeName="y" values="6;14;6" dur="1s" repeatCount="indefinite" begin="0s" />
    </rect>
    <rect x="8" y="6" width="3" height="12">
      <animate
        attributeName="height"
        values="12;8;12"
        dur="1s"
        repeatCount="indefinite"
        begin="0.2s"
      />
      <animate attributeName="y" values="6;10;6" dur="1s" repeatCount="indefinite" begin="0.2s" />
    </rect>
    <rect x="13" y="6" width="3" height="12">
      <animate
        attributeName="height"
        values="12;6;12"
        dur="1s"
        repeatCount="indefinite"
        begin="0.4s"
      />
      <animate attributeName="y" values="6;12;6" dur="1s" repeatCount="indefinite" begin="0.4s" />
    </rect>
    <rect x="18" y="6" width="3" height="12">
      <animate
        attributeName="height"
        values="12;9;12"
        dur="1s"
        repeatCount="indefinite"
        begin="0.6s"
      />
      <animate attributeName="y" values="6;9;6" dur="1s" repeatCount="indefinite" begin="0.6s" />
    </rect>
  </svg>
</template>
