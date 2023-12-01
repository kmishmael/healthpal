
export const shower = (): void => {
    const starsContainer = document.getElementById("stars-container");

    const left = Math.random() * window.outerWidth;
    const top = Math.random() * window.outerHeight;
    const duration = (Math.random() * 70000) / 10 + 3000;

    const div = document.createElement("div");
    div.className = "meteor";
    div.style.top = top - 300 + "px";
    div.style.left = left + "px";
    if (starsContainer) {
        starsContainer.append(div);
    }

    const animation = div.animate(
        [
            {
                offset: 0,
                opacity: 1,
                marginTop: "-300px",
                marginRight: "-300px",
            },
            { offset: 0.12, opacity: 0 },
            {
                offset: 0.15,
                opacity: 0,
                marginTop: "300px",
                marginLeft: "-600px",
            },
            { offset: 1, opacity: 0, width: 0 },
        ],
        { duration: duration, easing: "linear" }
    );

    animation.onfinish = () => div.remove();
};


export const generateStars = () => {
    const starsContainer = document.getElementById("stars-container");

    if (starsContainer) {
      for (let i = 0; i < 80; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        starsContainer.appendChild(star);
      }
    }
  };