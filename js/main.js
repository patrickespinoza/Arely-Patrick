document.addEventListener("DOMContentLoaded", () => {
  const countdownDateInput = document.getElementById("countdown-date");
  const countdownTimer = document.querySelector(".countdown-timer");

  const startCountdown = (endDate) => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(endDate).getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Actualizar el contenido de los elementos de la cuenta regresiva
      document.getElementById("days").textContent = days;
      document.getElementById("hours").textContent = hours;
      document.getElementById("minutes").textContent = minutes;
      document.getElementById("seconds").textContent = seconds;

      if (distance < 0) {
        clearInterval(intervalId);
        countdownTimer.textContent = "EXPIRED";
      }
    }, 1000);
  };

  // Verificar si localStorage está disponible
  if (typeof localStorage !== "undefined") {
    const savedDate = localStorage.getItem("countdownDate");
    if (savedDate) {
      // Ocultar el input y el botón si hay una fecha guardada
      countdownDateInput.style.display = "none";
      document.getElementById("startCount-btn");
      // Iniciar la cuenta regresiva
      startCountdown(savedDate);
    }
  }

  // Agregar un evento 'change' al input de fecha
  countdownDateInput.addEventListener("change", (event) => {
    const selectedDate = event.target.value;
    // Guardar la fecha en el localStorage
    localStorage.setItem("countdownDate", selectedDate);
    // Ocultar el input y el botón
    countdownDateInput.style.display = "none";
    document.getElementById("startCount-btn").style.display = "none";
    // Iniciar la cuenta regresiva
    startCountdown(selectedDate);
  });
});
