export default function SendMailForm() {
  const sendEmail = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    try {
      const res = await fetch("/api/mailer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "welcome",
          name: name,
          email: email,
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  return (
    <form onSubmit={sendEmail}>
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <button type="submit">Send Email</button>
    </form>
  );
}
