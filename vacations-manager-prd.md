# Team Vacation Tracker – Product Requirements Document (Updated)

## Purpose and Overview  
**Product Vision:** The Team Vacation Tracker is a React single-page application (SPA) for managing employee vacation days across multiple teams, with a clear visual calendar (Gantt chart) of who is off and when. The app aims to simplify PTO (paid time off) tracking by allowing team members to self-manage their vacations while accounting for country-specific public holidays and weekends. This ensures teams across different regions remain compliant with local holidays and company policies, and provides transparency so everyone knows team availability at a glance.

**Key Objectives:**  
- Provide an **easy-to-use interface** for both admins and team members to track vacations.  
- Display vacations on a **Gantt chart timeline** that clearly shows each person’s time off, excluding weekends and highlighting official holidays differently for clarity.  
- Accommodate **international teams**: support different holiday calendars per **person** (not per team) so global members can accurately track time off.  
- Enable **self-service PTO management**: team members can add/edit their own vacation periods without needing approval, aligning with modern PTO self-service practices.  
- Operate as an **MVP with no backend**: all data is stored locally in the browser (localStorage) for simplicity, with potential to integrate a backend in the future.

---

## User Roles and Permissions  
- **Admin User:** Responsible for initial setup and high-level management. An admin can create new teams, configure team settings (like invite codes), and manage holiday data (per country). Admins can also adjust global settings such as default vacation day allowances or carry-over if needed. *(Note: In the MVP, “admin” is a role assigned to the user who creates a team. There is no complex admin console; just extra options visible to team creators.)*  
- **Team Member:** Regular user who belongs to one or more teams. A team member can view team calendars, add or edit **their own** vacation entries, and see other members’ scheduled vacations on the Gantt chart. They **do not require approval** to log vacation days (self-serve model). Team members cannot create or delete teams, but they can join existing teams via an invite code provided by an admin. If a user belongs to multiple teams, they will have one consolidated profile (and vacation allowance) visible across those teams.

**Invite & Team Joining Workflow:**  
Admins can invite team members by sharing a **join code** (e.g., a 6-digit alphanumeric code). A new user or an existing user can enter this code in the app to join the corresponding team. Each code is unique to a team and generated on team creation (or on-demand by admin). No authentication system is in place in MVP, so the code acts as the primary way to associate a user with a team on that device.

---

## Functional Requirements  

### 1. Team Management  
**Create and Manage Teams (Admin Only):**  
- An admin can create a new team by providing a team name (and optionally a short description).  
- Teams **do not have a country** — they can include members from any region.  
- A team consists of:  
  - `id`  
  - `name`  
  - `members[]` (list of user IDs).  
- Admin can **view team membership**: see a list of all members in the team (locally).  
- Admin can remove a member from a team (optional for MVP; could be future enhancement).  

**Invite/Join Process:**  
- The app provides an **interface to enter a team invite code**. When a team member enters a valid code, they are added to that team’s local roster.  
- **Multiple Team Membership:** A user’s profile can be linked to multiple teams. The UI should allow switching between teams or a combined view. The user’s **vacation day balance is global** (per year) across teams – i.e., if they use 5 days in Team A, those 5 days count against their total 24 days in Team B as well.  

### 2. User Profile and Vacation Allowance Management  
**User Profile:**  
- Each user (admin or team member) has a simple profile including **Name**, **Home Country** (for holiday reference), and **Annual Vacation Day Allowance**.  
- By default, each new profile is assigned **24 vacation days per year**. This can be adjusted manually by an admin.  
- The profile tracks the number of **vacation days remaining** in the current year. When a vacation is logged, the used days should be deducted automatically.  

**Fields:**  
| Field | Type | Description |
|--------|------|-------------|
| `id` | string | Unique user ID |
| `name` | string | Display name |
| `country` | string | ISO country code determining their holiday calendar |
| `vacationDaysPerYear` | number | Default 24 |
| `vacationUsed` | number | Days already taken this year |
| `teams[]` | string[] | List of teams the user belongs to |

**Behavior:**  
- Changing a user’s country updates which national holidays apply to them.  
- A single user’s allowance is shared globally across all their teams.  

### 3. Holiday Management (Per Country)  
**Holiday Calendars:**  
- The application must support defining **official public holidays** per country.  
- Admins can manage and edit a list of holidays for each country.  
- Each holiday includes a date and description.  
- Holidays are not tied to teams — they are tied to a country and applied to users based on their `country` field.  

**Structure:**  
| Field | Type | Description |
|--------|------|-------------|
| `country` | string | ISO country code |
| `holidays[]` | array | List of holiday objects `{ date, name }` |

**Behavior:**  
- When a user schedules a vacation, any overlapping holidays (for that user’s country) are **excluded** from the vacation day count.  
- Holidays are displayed distinctly on the Gantt chart (different color or shading).  

Example:  
If John (🇺🇸) takes vacation July 3–7 and July 4 is Independence Day, only 4 days count against his allowance. July 4 still appears as a holiday in gray on his row.  

### 4. Vacation Scheduling (Self-Service)  
**Add Vacation (Team Member):**  
- A team member can create a vacation entry for themselves with start and end dates and an optional note.  
- The system automatically calculates workdays by excluding:  
  - Saturdays and Sundays.  
  - Official holidays based on their country.  
- The result determines how many vacation days are deducted.  

**Edit/Delete Vacation:**  
- Team members can edit or delete their own vacations.  
- Updating dates recalculates the day count and adjusts remaining allowance.  

**Rules:**  
- No approval workflow.  
- Cannot exceed remaining allowance.  
- Holidays inside vacation ranges are automatically excluded from deduction.  

### 5. Gantt Chart Display (Calendar View)  
**Chart Layout:**  
- Rows represent **team members**.  
- Columns represent **workdays** (Mon–Fri only).  
- Weekends are skipped entirely.  
- Each vacation period is a colored bar across the member’s row.  

**Color Scheme:**  
- **Vacation Days** – one color (e.g., blue/green).  
- **Official Holidays** – another color (e.g., gray).  
- Tooltip on hover: user name, vacation note, duration, and country.  

**Multi-Country Logic:**  
- Each user’s row respects their country’s holidays — meaning the same date might show differently across users.  
- Holidays are shaded per row (not global).  

**Interactions:**  
- Horizontal scroll for long timelines; vertical scroll for teams.  
- Optionally display “Today” marker.  

### 6. Data Persistence (Local Storage MVP)  
- All data is stored in `localStorage`.  
- Structure example:  
```json
{
  "users": [{...}],
  "teams": [{...}],
  "holidays": {
    "US": [{ "date": "2025-07-04", "name": "Independence Day" }],
    "FR": [{ "date": "2025-07-14", "name": "Bastille Day" }]
  },
  "vacations": [{...}]
}
```
- No backend.  
- Data persists between sessions locally.  
- Multiple teams and members can be simulated within a single instance.  

---

## Tech Stack & UI  
- **React SPA** (already bootstrapped).  
- **Tailwind CSS** for styling.  
- **Shadcn/UI** components (modals, toasts, tables, forms, date pickers).  
- **Responsive layout:** desktop-first; mobile scroll-friendly.  
- **State Management:** React Context or Zustand.  

---

## Non-Functional Requirements  
- **Performance:** Efficient rendering of ~250 workdays x N members.  
- **Accessibility:** Shadcn (Radix UI) ensures ARIA compliance.  
- **Persistence:** Uses `localStorage`.  
- **Security:** No authentication or encryption in MVP.  
- **Scalability:** Architecture ready for future backend.  

---

## MVP Scope & Limitations  
- **Single-device operation** only (no sync).  
- **Invite codes** simulated locally.  
- **No approval or leave types** (vacation only).  
- **No carry-over or accrual logic**.  
- **No email notifications.**  
- Designed for one person or demo teams initially.  

---

## Future Enhancements  
- Cloud sync and authentication.  
- Real invite system and backend.  
- Public holiday API integration.  
- Calendar export (iCal/Google).  
- Reports and dashboards.  
- Leave types (sick, parental).  
- Carry-over and accrual logic.  

---

## Data Model Summary  

| Entity | Fields | Description |
|---------|---------|-------------|
| **User** | `id`, `name`, `country`, `vacationDaysPerYear`, `vacationUsed`, `teams[]` | Represents a person; country defines national holidays |
| **Team** | `id`, `name`, `members[]` | A group of users (multi-country allowed) |
| **Holiday** | `country`, `holidays[]` | Country-specific holiday list |
| **Vacation** | `id`, `userId`, `teamId`, `start`, `end`, `note` | Vacation record |
| **Settings** | Default config | Global default allowance, etc. |

---

### ✅ Summary of Key Change
> Teams no longer have an assigned country.  
> Each **user** has a country determining their national holidays.  
> Gantt charts and vacation calculations apply per-user holiday calendars.

---

## Conclusion  
This MVP delivers a complete, local-only vacation management app supporting multiple teams and international members. It provides immediate visual transparency into team availability using a Gantt chart, ensures holidays are correctly applied per user, and offers a foundation for future real-time and cloud-based functionality.
