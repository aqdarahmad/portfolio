import { Code2 } from "lucide-react";

export default function ProjectPreview({ type }) {
  return (
    <div className={`project-preview preview-${type}`}>
      <div className="preview-top">
        <span />
        <span />
        <span />
        <small>PROJECT PREVIEW</small>
      </div>

      {type === "fabric" ? (
        <div className="fabric-preview-content">
          <div className="fabric-swatch">✿</div>
          <div>
            <small>DETECTED FABRIC</small>
            <h4>Cotton</h4>
            <div className="progress-line" />
            <small>Confidence: High</small>
          </div>
        </div>
      ) : type === "booking" ? (
        <div className="booking-preview-content">
          <div className="fake-sidebar" />
          <div className="fake-dashboard">
            <div className="fake-bar" />
            <div className="fake-stats">
              <span />
              <span />
              <span />
            </div>
            <div className="fake-table">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      ) : type === "weather" ? (
        <div className="weather-preview-content">
          <span className="weather-sun">☀</span>
          <div>
            <small>GOOD WEATHER TODAY</small>
            <h2>24°</h2>
            <p>Sunny and bright</p>
          </div>
        </div>
      ) : (
        <div className="code-preview-content">
          <Code2 size={36} />
          <span>Building something awesome</span>
          <div className="fake-bar" />
          <div className="fake-bar short" />
        </div>
      )}
    </div>
  );
}
