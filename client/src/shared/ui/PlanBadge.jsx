export default function PlanBadge({ plan, expiresAt }) {
  const styles = {
    free: `
      bg-slate-700/40
      text-slate-300
      border border-slate-500/30
    `,
    silver: `
      bg-gradient-to-r from-gray-300/20 to-gray-500/20
      text-gray-200
      border border-gray-300/30
      shadow-lg shadow-gray-400/10
    `,
    gold: `
      bg-gradient-to-r from-yellow-400/20 to-amber-500/20
      text-yellow-300
      border border-yellow-400/40
      shadow-lg shadow-yellow-500/20
    `,
  };

  const isExpiringSoon =
    expiresAt && new Date(expiresAt) - new Date() < 7 * 24 * 60 * 60 * 1000;

  return (
    <div className="flex items-center gap-3 mt-3">
      <span
        className={`
          px-4 py-1 rounded-full text-xs font-semibold tracking-wide
          backdrop-blur-xl
          ${styles[plan] || styles.free}
        `}
      >
        {plan?.toUpperCase()} PLAN
      </span>

      {expiresAt && (
        <span className="text-xs text-slate-400">
          Expires {new Date(expiresAt).toLocaleDateString()}
        </span>
      )}

      {isExpiringSoon && (
        <span className="text-xs text-yellow-400">Expiring soon</span>
      )}
    </div>
  );
}
