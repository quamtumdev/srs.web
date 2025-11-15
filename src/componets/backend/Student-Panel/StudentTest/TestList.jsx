/* eslint-disable react/prop-types */

import { useState } from "react";
import TestCard from "./TestCard";

const TestList = ({ tests, loading, onEdit, onDelete, onView, onRefresh }) => {
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Debug: Log tests data
  console.log("TestList - Rendering tests:", {
    count: tests.length,
    loading,
    tests,
  });

  // Get unique subjects from tests
  const subjects = ["all", ...new Set(tests.map(test => test.subject))];

  // Filter and sort tests
  const getFilteredAndSortedTests = () => {
    let filtered = [...tests];

    // Filter by subject
    if (filterSubject !== "all") {
      filtered = filtered.filter(test => test.subject === filterSubject);
    }

    // Filter by status
    if (filterStatus !== "all") {
      if (filterStatus === "published") {
        filtered = filtered.filter(test => test.isPublished === true);
      } else if (filterStatus === "draft") {
        filtered = filtered.filter(test => test.isPublished === false);
      }
    }

    // Sort tests
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt || b.createdDate) -
            new Date(a.createdAt || a.createdDate)
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt || a.createdDate) -
            new Date(b.createdAt || b.createdDate)
        );
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "questions":
        filtered.sort(
          (a, b) =>
            (b.questionsCount || b.questions?.length || 0) -
            (a.questionsCount || a.questions?.length || 0)
        );
        break;
      default:
        break;
    }

    console.log("TestList - Filtered and sorted:", {
      original: tests.length,
      filtered: filtered.length,
      filterSubject,
      filterStatus,
      sortBy,
    });

    return filtered;
  };

  const filteredTests = getFilteredAndSortedTests();

  if (loading) {
    return (
      <div className="test-module-SRS__loading">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <div
            className="spinner-border test-module-SRS__spinner"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading tests...</p>
        </div>
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <div className="test-module-SRS__empty-state">
        <div className="text-center py-5">
          <i className="fas fa-clipboard-list test-module-SRS__empty-icon mb-3"></i>
          <h4 className="test-module-SRS__empty-title">No Tests Created Yet</h4>
          <p className="test-module-SRS__empty-description">
            Start creating tests for your students by clicking the Create New
            Test button above.
          </p>
          <button className="btn btn-primary mt-3" onClick={onRefresh}>
            <i className="fas fa-sync-alt me-2"></i>
            Refresh Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="test-module-SRS__test-list">
      {/* Header with Filters */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3 col-sm-6 mb-2 mb-md-0">
                  <h5 className="mb-0">
                    <i className="fas fa-list me-2"></i>
                    All Tests ({filteredTests.length})
                  </h5>
                </div>

                <div className="col-md-3 col-sm-6 mb-2 mb-md-0">
                  <select
                    className="form-select form-select-sm"
                    value={filterSubject}
                    onChange={e => {
                      console.log(
                        "TestList - Subject filter changed:",
                        e.target.value
                      );
                      setFilterSubject(e.target.value);
                    }}
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>
                        {subject === "all" ? "All Subjects" : subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-2 col-sm-6 mb-2 mb-md-0">
                  <select
                    className="form-select form-select-sm"
                    value={filterStatus}
                    onChange={e => {
                      console.log(
                        "TestList - Status filter changed:",
                        e.target.value
                      );
                      setFilterStatus(e.target.value);
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="col-md-2 col-sm-6 mb-2 mb-md-0">
                  <select
                    className="form-select form-select-sm"
                    value={sortBy}
                    onChange={e => {
                      console.log("TestList - Sort changed:", e.target.value);
                      setSortBy(e.target.value);
                    }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">Title (A-Z)</option>
                    <option value="questions">Most Questions</option>
                  </select>
                </div>

                <div className="col-md-2 col-sm-12">
                  <button
                    className="btn btn-outline-primary btn-sm w-100"
                    onClick={() => {
                      console.log("TestList - Refresh clicked");
                      onRefresh();
                    }}
                  >
                    <i className="fas fa-sync-alt me-2"></i>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tests Grid */}
      {filteredTests.length > 0 ? (
        <div className="row">
          {filteredTests.map(test => (
            <div
              key={test._id || test.id}
              className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4"
            >
              <TestCard
                test={test}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning text-center">
          <i className="fas fa-filter me-2"></i>
          No tests match the current filters. Try adjusting your filters.
        </div>
      )}
    </div>
  );
};

export default TestList;
