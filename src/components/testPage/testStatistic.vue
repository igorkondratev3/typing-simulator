<script setup>
defineProps({
  accuracy: String,
  printSpeed: String
});
</script>

<template>
  <div class="statistic">
    <div class="statistic__parameter statistic-parameter">
      <img
        class="statistic-parameter__icon"
        src="/src/assets/svg/speed.svg"
        alt="speed"
      />
      <div class="statistic-parameter__value">
        <h6 class="statistic-parameter__header">Скорость:</h6>
        <div class="statistic-parameter__result">
          <p class="statistic-parameter__speed">{{ printSpeed }}</p>
          <p class="statistic-parameter__units">зн/мин</p>
        </div>
      </div>
    </div>
    <div class="statistic__parameter statistic-parameter">
      <img
        class="statistic-parameter__icon"
        src="/src/assets/svg/task.svg"
        alt="accuracy"
      />
      <div class="statistic-parameter__value">
        <p class="statistic-parameter__header">Точность:</p>
        <div class="statistic-parameter__result">
          <p class="statistic-parameter__accuracy">
            {{ accuracy }}
          </p>
          <p class="statistic-parameter__units">%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.statistic {
  display: flex;
  justify-content: space-around;
  font-size: 24px;
}

.statistic-parameter {
  display: flex;
  align-items: center;
}

.statistic-parameter__icon {
  width: 48px;
  height: 48px;
  margin-right: 8px;
}

.statistic-parameter__value {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statistic-parameter__header {
  font-size: 24px;
  text-align: center;
}

.statistic-parameter__result {
  display: flex;
}

.statistic-parameter__speed {
  width: 50px;
  margin-right: 2px;
  font-size: 28px;
  text-align: center;
}

.statistic-parameter__accuracy {
  width: 90px;
  margin-right: 2px;
  font-size: 28px;
  text-align: center;
}

.statistic-parameter__units {
  display: flex;
  align-items: center;
  font-size: 20px;
}
</style>
