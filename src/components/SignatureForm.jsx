const FIELDS = [
  { name: "name",    placeholder: "Full Name",   type: "text"  },
  { name: "title",   placeholder: "Job Title",   type: "text"  },
  { name: "company", placeholder: "Company",     type: "text"  },
  { name: "phone",   placeholder: "Phone",       type: "tel"   },
  { name: "email",   placeholder: "Email",       type: "email" },
  { name: "website", placeholder: "Website URL", type: "url"   },
];

export default function SignatureForm({ data, setData }) {
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <div className="space-y-3">
      {FIELDS.map(({ name, placeholder, type }) => (
        <input
          key={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={data[name]}
          onChange={handleChange}
          className="w-full bg-bg-base border border-border-base rounded-xl px-4 py-3 text-base text-text-base placeholder:text-text-muted focus:outline-hidden focus:border-primary transition-colors"
        />
      ))}
    </div>
  );
}
