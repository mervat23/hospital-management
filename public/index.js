paypal
  .Buttons({
    async createAppointment() {
      try {
        const res = await fetch("createPayment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patient: "661ed8d89477496aa5c83e14",
            appointment: "661ec97ce90e0b9939f7cf4e",
            amount: 300,
            method: "paypal",
          }),
        });

        const result = await res.json();

        if (result.success) {
          return result.appointmentRes.result.id;
        } else {
          console.log(result.error);
        }
      } catch (err) {
        console.log(err);
      }
    },

    onApprove(data, actions) {
      return actions.order.capture();
    },
  })
  .render("#paypal");