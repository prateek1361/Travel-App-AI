import { useState } from "react";

export default function App() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!destination || !days || !budget) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setPlan("");

    try {
      const res = await fetch(
        "https://ai-travel-app-ten.vercel.app/api/travel/plan",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ destination, days, budget }),
        }
      );

      const data = await res.json();
      setPlan(data.plan);
    } catch (error) {
      setPlan("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const planLines = plan.split("\n").filter(Boolean);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">✈️ AI Travel Planner</h2>

              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Destination (e.g. Paris)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Number of days"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Budget (Low / Medium / High)"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-primary"
                  onClick={generatePlan}
                  disabled={loading}
                >
                  {loading ? "Planning your trip..." : "Generate Plan"}
                </button>
              </div>

              {loading && (
                <p className="text-center mt-3 text-muted">
                  Creating itinerary 🌍
                </p>
              )}
            </div>
          </div>

          {plan && (
            <div className="mt-4">
              <h4 className="mb-3">Your Travel Plan</h4>

              {planLines.map((line, index) => (
                <div
                  key={index}
                  className={
                    line.toLowerCase().includes("day")
                      ? "alert alert-primary fw-bold"
                      : "card mb-2"
                  }
                >
                  <div className="card-body py-2">{line}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
