export default function Skills({ groups }) {
  return (
    <section className="skills" id="skills">
      <h2 className="section-title">What I work with</h2>
      <dl className="skill-groups">
        {groups.map((group) => (
          <div className="skill-group" key={group.name}>
            <dt>{group.name}</dt>
            <dd>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
