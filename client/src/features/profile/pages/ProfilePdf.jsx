import React, { forwardRef } from "react";

const ProfilePDF = forwardRef(({ user, stats }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: "820px",
        padding: "56px",
        backgroundColor: "#ffffff",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: "#0f172a",
      }}
    >
      <div
        style={{
          marginBottom: "40px",
          borderBottom: "2px solid #e2e8f0",
          paddingBottom: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "800",
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          Scooptale
        </h1>

        <p
          style={{
            marginTop: "6px",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Movie Identity Report
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "26px",
          padding: "26px",
          borderRadius: "18px",
          border: "1px solid #e5e7eb",
          marginBottom: "30px",
        }}
      >
        <img
          src={user?.profileImageUrl}
          crossOrigin="anonymous"
          alt="avatar"
          style={{
            width: "95px",
            height: "95px",
            borderRadius: "18px",
            objectFit: "cover",
            border: "4px solid #22c55e",
          }}
        />

        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "26px",
              fontWeight: "800",
              color: "#020617",
            }}
          >
            {user?.name || "User"}
          </h2>

          <p
            style={{
              margin: "6px 0",
              color: "#475569",
              fontSize: "15px",
            }}
          >
            {user?.email}
          </p>

          {user?.isEmailVerified && (
            <div
              style={{
                marginTop: "6px",
                height: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ECFDF5",
                  color: "#047857",
                  padding: "0 12px",
                  height: "20px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  fontWeight: "700",
                  lineHeight: "20px",
                  whiteSpace: "nowrap",
                }}
              >
                Verified Account
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          padding: "22px",
          borderRadius: "16px",
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          marginBottom: "24px",
          fontSize: "16px",
        }}
      >
        <strong>Current Plan: </strong>

        <span
          style={{
            color: "#16a34a",
            fontWeight: "800",
            letterSpacing: "0.4px",
          }}
        >
          {(user?.currentPlan || "free").toUpperCase()}
        </span>
      </div>

      <div
        style={{
          padding: "22px",
          borderRadius: "16px",
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          marginBottom: "36px",
        }}
      >
        <strong>Address</strong>

        <p
          style={{
            marginTop: "8px",
            color: "#475569",
          }}
        >
          {user?.address || "Not provided"}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "18px",
        }}
      >
        {[
          { label: "Saved", value: stats?.watchlist || 0 },
          { label: "Watched", value: stats?.watched || 0 },
          { label: "Reviewed", value: stats?.reviewed || 0 },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              flex: 1,
              padding: "22px",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "30px",
                fontWeight: "900",
                color: "#16a34a",
                margin: 0,
              }}
            >
              {item.value}
            </p>

            <span
              style={{
                color: "#64748b",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: "50px",
          color: "#94a3b8",
          fontSize: "12px",
        }}
      >
        Generated by Scooptale • {new Date().getFullYear()}
      </p>
    </div>
  );
});

export default ProfilePDF;
